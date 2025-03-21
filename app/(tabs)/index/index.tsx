import { SafeAreaView, StyleSheet, View} from 'react-native';
import CTA from "@/components/ui/CTA";
import {useTranslations} from "@/contexts/LangueProvider";
import {ThemedText} from "@/components/ui/ThemedText";
import {Image} from "expo-image";

export default function HomeScreen() {
    const { t } = useTranslations();

    // TODO: animations + generate story form
    return (
        <>
            <SafeAreaView
                contentInsetAdjustmentBehavior="automatic"
            >
                <View style={styles.container}>
                    <View flexDirection="row" alignItems="center" gap={8}>
                        <Image
                            source={require('@/assets/icons/icon.png')}
                            style={{width: 34, height: 34, borderRadius: 34/9*2}}
                        />
                        <ThemedText type="title2" marginTop={4}>Wonder Story</ThemedText>
                    </View>
                    <View style={{flex: 1, alignItems: 'center', justifyContent: 'center', gap: 32, width: '100%' }}>
                        <ThemedText type="title3" style={{textAlign: 'center'}}>{t('home.welcome')}</ThemedText>
                        <CTA
                            icon={"Sparkles"}
                            label={t('generate')}
                            onPress={() => {}}
                        />
                    </View>
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
