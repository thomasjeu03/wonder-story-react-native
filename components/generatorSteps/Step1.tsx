import {ThemedText} from "../ui/ThemedText";
import {useTranslations} from "@/contexts/LangueProvider";

export default function Step1() {
    const { t } = useTranslations();

    return (
        <>
            <ThemedText type="title">Wonder Story</ThemedText>
            <ThemedText type="title4" style={{ marginTop: 20 }}>{t('home.welcome')}</ThemedText>
        </>
    );
}