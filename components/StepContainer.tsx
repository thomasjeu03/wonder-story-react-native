import {Animated, TouchableOpacity, View, StyleSheet} from "react-native";
import {useTranslations} from "@/contexts/LangueProvider";
import {ThemedText} from "./ui/ThemedText";
import CTA from "@/components/ui/CTA";
import {useEffect, useRef} from "react";

const StepContainer = (
    { currentStep, steps, handleNext, handlePrev, handleSubmit, loading }:
   {steps: any[], currentStep: number, handleNext: () => void, handlePrev: () => void, handleSubmit: () => void, loading: boolean }
) => {
    const { t } = useTranslations()
    const animatedWidth = useRef(new Animated.Value(0)).current;

    useEffect(() => {
        Animated.timing(animatedWidth, {
            toValue: (currentStep / 4) * 100,
            duration: 300,
            useNativeDriver: false,
        }).start();
    }, [currentStep]);

    return (
        <View
            style={{
                height: '100%',
            }}
        >
            {currentStep !== 0 && (
                <View style={[styles.stepper, {backgroundColor: '#151515'}]}>
                    <Animated.View
                        style={[
                            styles.stepperPillule,
                            {
                                width: animatedWidth.interpolate({
                                    inputRange: [0, 100],
                                    outputRange: ['0%', '100%'],
                                }),
                                backgroundColor: '#3b3b3b',
                            },
                        ]}
                    />
                </View>
            )}

            <View style={{flex: 1, paddingHorizontal: 16, paddingVertical: 24, width: '100%', gap: 16}}>
                {steps[currentStep].content}
            </View>


            {currentStep !== 4 && currentStep !== 0 && (
                <View style={{ position: 'relative', bottom: 24, width: '100%', alignItems: 'center', paddingHorizontal: 24, zIndex: 1  }}>
                    <View style={{ flexDirection: 'row', justifyContent: 'space-between', width: '100%', alignItems: 'flex-end'}}>
                        <TouchableOpacity onPress={handlePrev} style={{ backgroundColor: '#595959', padding: 16, borderRadius: 16 }}>
                            <ThemedText style={{fontWeight: 'bold'}}>{t('common.back')}</ThemedText>
                        </TouchableOpacity>
                        {currentStep !== steps.length - 2 && currentStep !== steps.length - 1 ? (
                            <TouchableOpacity onPress={handleNext} disabled={currentStep === steps.length - 1} style={{ backgroundColor: '#fff', padding: 16, borderRadius: 16 }}>
                                <ThemedText style={{color: 'black', fontWeight: 'bold'}}>{t('common.next')}</ThemedText>
                            </TouchableOpacity>
                        ) : (
                            <CTA
                                icon={"Sparkles"}
                                disabled={loading}
                                label={loading ? t('loading') : t('common.create')}
                                onPress={handleSubmit}
                            />
                        )}
                    </View>
                </View>
            )}
        </View>
    );
};

export default StepContainer;

const styles = StyleSheet.create({
    stepper: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'flex-start',
        overflow: 'hidden',
        height: 8,
    },
    stepperPillule: {
        height: '100%',
    }
});
