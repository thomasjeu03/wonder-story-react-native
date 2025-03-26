import {SafeAreaView, StyleSheet, View, Alert, Pressable} from 'react-native';
import CTA from "@/components/ui/CTA";
import {useTranslations} from "@/contexts/LangueProvider";
import {ThemedText} from "@/components/ui/ThemedText";
import {useState} from "react";
import {Story} from "@/models/StoryModel";
import { getLocales } from 'expo-localization';
import { useNavigation } from 'expo-router';
import axios from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";
import TextInput from "@/components/ui/TextInput";
import Slider from '@react-native-community/slider';
import StoriesScreen from "@/screens/StoriesScreen";

export default function HomeScreen() {
    const { t } = useTranslations();
    const navigation = useNavigation();
    const locale = getLocales()[0]?.languageCode || 'en';

    const [tab, setTab] = useState('generate')

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

            if (response.data?.id && response.data?.story) {
                const storyIds = await AsyncStorage.getItem("storyIds");
                const parsedStoryIds = storyIds ? JSON.parse(storyIds) : [];
                await AsyncStorage.setItem("storyIds", JSON.stringify([{id: response.data.id, story: response.data.story}, ...parsedStoryIds]));
                setTab('stories')
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
                <View style={{ flexDirection: 'row', alignItems: 'center', gap: 16, padding: 16 }}>
                    <Pressable onPress={() => setTab('generate')}>
                        <ThemedText style={tab === 'generate' ? {} : {opacity: 0.5}} type='title2'>
                            {t('generate')}
                        </ThemedText>
                    </Pressable>
                    <Pressable onPress={() => setTab('stories')}>
                        <ThemedText style={tab === 'stories' ? {} : {opacity: 0.3}} type='title2'>
                            {t('stories')}
                        </ThemedText>
                    </Pressable>
                </View>

                {tab === 'generate' && (
                    <View style={styles.container}>
                        {step === 1 && (
                            <View style={{flex: 1, gap: 24, width: '100%' }}>
                                <ThemedText type="title3" style={{opacity: 0.66}}>{t('home.welcome')} !</ThemedText>
                                <TextInput
                                    placeholder={t('name')}
                                    value={data.mainCaracter}
                                    onChangeText={(text) => setData({ ...data, mainCaracter: text })}
                                />
                                <View style={{width: '100%'}}>
                                    <View style={{flexDirection: 'row', justifyContent: 'space-between'}}>
                                        <ThemedText type="title5">
                                            {t('age')}
                                        </ThemedText>
                                        <ThemedText type="title4">
                                            {data?.ageRange} {t('yearold')}
                                        </ThemedText>
                                    </View>
                                    <Slider
                                        style={{width: '100%'}}
                                        minimumValue={0}
                                        value={data?.ageRange}
                                        step={1}
                                        maximumValue={10}
                                        onValueChange={(value) => setData({ ...data, ageRange: value })}
                                    />
                                </View>
                                <View style={{width: '100%'}}>
                                    <View style={{flexDirection: 'row', justifyContent: 'space-between'}}>
                                        <ThemedText type="title5">
                                            {t('time')}
                                        </ThemedText>
                                        <ThemedText type="title4">
                                            {data?.time} min
                                        </ThemedText>
                                    </View>
                                    <Slider
                                        style={{width: '100%'}}
                                        minimumValue={0}
                                        value={data?.time}
                                        step={1}
                                        maximumValue={10}
                                        onValueChange={(value) => setData({ ...data, time: value })}
                                    />
                                </View>
                                {data.mainCaracter && (
                                    <CTA
                                        icon={"Sparkles"}
                                        disabled={loading}
                                        label={t('generate')}
                                        onPress={handleSubmit}
                                    />
                                )}
                            </View>
                        )}
                    </View>
                )}
                {tab === 'stories' && (
                    <StoriesScreen />
                )}
            </SafeAreaView>
        </>
    )
}

const styles = StyleSheet.create({
    container: {
        alignItems: 'center',
        paddingVertical: 8,
        paddingHorizontal: 16,
        gap: 8,
        height: '100%'
    }
});
