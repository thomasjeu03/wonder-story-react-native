import { ScrollView, View} from 'react-native';

import {useTranslations} from "@/contexts/LangueProvider";
import {useSafeAreaInsets} from "react-native-safe-area-context";
import React, {useState} from "react";
import TextInput from "@/components/ui/TextInput";
import CTA from "@/components/ui/CTA";
import {ThemedText} from "@/components/ui/ThemedText";

export default function createProject() {
    const { t } = useTranslations();

    const [data, setData] = useState({

    })

    const safeAreaBottom = useSafeAreaInsets()

    const handleSubmit = async () => {

    }

    return (
        <>
            <ScrollView
                contentInsetAdjustmentBehavior="automatic"
            >
                <View style={{ gap: 24, paddingTop: 12, paddingHorizontal: 16, paddingBottom: safeAreaBottom.bottom + 32 }}>
                    {/*TODO: story form here*/}
                    <ThemedText type='title'>{t('new-story')}</ThemedText>
                    <TextInput
                        required
                        value={data.name}
                        label={t('name')}
                        onChangeText={(value) => setData({...data, name: value})}
                    />

                    <CTA
                        label={t('common.create')}
                        disabled={!data?.name}
                        icon='CirclePlus'
                        onPress={handleSubmit}
                    />
                </View>
            </ScrollView>
        </>
    )
}
