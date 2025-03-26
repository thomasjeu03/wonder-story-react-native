import {Pressable, View} from "react-native";
import {useTranslations} from "@/contexts/LangueProvider";
import {ThemedText} from "./ui/ThemedText";
import CTA from "@/components/ui/CTA";

const StepContainer = (
    { currentStep, steps, handleNext, handlePrev, handleSubmit, loading }:
   {steps: any[], currentStep: number, handleNext: () => void, handlePrev: () => void, handleSubmit: () => void, loading: boolean }
) => {
    const { t } = useTranslations()

    return (
        <View
            style={{
                alignItems: 'center',
                height: '100%',
            }}
        >
            {steps[currentStep].content}

            {currentStep !== 4 && (
                <View style={{ position: 'absolute', bottom: 20, width: '100%', alignItems: 'center', paddingHorizontal: 16, zIndex: 1  }}>
                    {currentStep === 0 ? (
                        <CTA
                            icon={"Sparkles"}
                            disabled={loading}
                            label={t('generate')}
                            onPress={handleNext}
                        />
                    ) : (
                        <View style={{ flexDirection: 'row', justifyContent: 'space-between', width: '100%', alignItems: 'flex-end'}}>
                            <Pressable onPress={handlePrev} style={{ backgroundColor: '#ccc', padding: 10, borderRadius: 10, height: 34 }}>
                                <ThemedText>{t('common.back')}</ThemedText>
                            </Pressable>
                            {currentStep !== steps.length - 2 && currentStep !== steps.length - 1 ? (
                                <Pressable onPress={handleNext} disabled={currentStep === steps.length - 1} style={{ backgroundColor: '#6200ee', padding: 10, borderRadius: 10 }}>
                                    <ThemedText style={{ color: 'white' }}>{t('common.next')}</ThemedText>
                                </Pressable>
                            ) : (
                                <CTA
                                    icon={"Sparkles"}
                                    disabled={loading}
                                    label={loading ? t('loading') : t('common.create')}
                                    onPress={handleSubmit}
                                />
                            )}
                        </View>
                    )}
                </View>
            )}
        </View>
    );
};

export default StepContainer;
