import { ScrollView, StyleSheet, useColorScheme, View} from 'react-native';

import {useTranslations} from "@/contexts/LangueProvider";
import {useSafeAreaInsets} from "react-native-safe-area-context";

export default function index() {
    const colorScheme = useColorScheme();
    const { t } = useTranslations();

    const safeAreaBottom = useSafeAreaInsets()

    return (
        <>
            <ScrollView
                contentInsetAdjustmentBehavior="automatic"
            >
                <View style={{ gap: 16, paddingTop: 12, paddingHorizontal: 16, paddingBottom: safeAreaBottom.bottom + 32 }}>

                </View>
            </ScrollView>
        </>
    )
}

const styles = StyleSheet.create({

});
