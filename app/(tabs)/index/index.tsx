import {SafeAreaView, StyleSheet, View, Alert, ActivityIndicator} from 'react-native';
import CTA from "@/components/ui/CTA";
import {useTranslations} from "@/contexts/LangueProvider";
import {ThemedText} from "@/components/ui/ThemedText";
import {Image} from "expo-image";
import {useEffect, useState} from "react";
import {Story} from "@/models/StoryModel";
import { getLocales } from 'expo-localization';
import { useNavigation } from 'expo-router';
import axios from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";
import TextInput from "@/components/ui/TextInput";

export default function HomeScreen() {
    const { t } = useTranslations();
    const navigation = useNavigation();
    const locale = getLocales()[0]?.languageCode || 'en';

    const [step, setStep] = useState(1)
    const [loading, setLoading] = useState<Boolean>(false)
    const [error, setError] = useState<String>('')

    const [data, setData] = useState<Story>({
        locale: locale,
        caracters: [''],
        mainCaracter: '',
        places: [''],
        ageRange: 3,
        time: 2,
        genres: [''],
        moral: true,
    })

    const nextStep = () => {
        setStep(step + 1)
    }

    const handleSubmit = async (e) => {
        e.preventDefault();
        // nextStep()
        setError('');
        setLoading(true);
        setData({
            ...data,
            caracters: [''],
            mainCaracter: '',
            places: [''],
            ageRange: 3,
            time: 2,
            genres: [''],
            moral: true,
        })
        try {
            const response = await axios.create(
                {
                    baseURL: 'https://wonder-story.app',
                    headers: {
                        'Content-Type': 'application/json',
                        Authorization: undefined,
                    },
                }
            ).post(
                '/api/generate',
                { data, userId: 24 },
            );

            if (response.data?.id) {
                const storyIds = await AsyncStorage.getItem("storyIds");
                const parsedStoryIds = storyIds ? JSON.parse(storyIds) : [];
                await AsyncStorage.setItem("storyIds", JSON.stringify([{id : response.data.id}, ...parsedStoryIds]));
                // @ts-ignore
                navigation.navigate(`stories`);
            } else {
                Alert.alert(t('common.error'), 'Invalid response from server',)
                throw new Error('Invalid response from server');
            }
        } catch (err) {
            Alert.alert(t('common.error'), 'Error creating the story',)
            // @ts-ignore
            setError(err.response?.data?.message || 'Error creating the story');
        } finally {
            setLoading(false)
        }
    };

    // TODO: animations + generate story form
    return (
        <>
            <SafeAreaView>
                <View style={styles.container}>
                    <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'center', gap: 8 }}>
                        <Image
                            source={require('@/assets/icons/icon.png')}
                            style={{width: 34, height: 34, borderRadius: 34/9*2}}
                        />
                        <ThemedText type="title2" style={{marginTop: 4}}>Wonder Story</ThemedText>
                    </View>
                    {step === 1 && (
                        <View style={{flex: 1, alignItems: 'center', justifyContent: 'center', gap: 32, width: '100%' }}>
                            <ThemedText type="title3" style={{textAlign: 'center'}}>{t('home.welcome')}</ThemedText>
                            <TextInput
                                placeholder={t('name')}
                                value={data.mainCaracter}
                                onChangeText={(text) => setData({ ...data, mainCaracter: text })}
                            />
                            <CTA
                                icon={"Sparkles"}
                                disabled={loading}
                                label={t('generate')}
                                onPress={handleSubmit}
                            />
                        </View>
                    )}
                </View>
            </SafeAreaView>
        </>
    )
}

const styles = StyleSheet.create({
    container: {
        alignItems: 'center',
        paddingVertical: 8,
        paddingHorizontal: 32,
        gap: 8,
        height: '100%'
    }
});
