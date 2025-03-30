import {SafeAreaView, View, Alert, Pressable} from 'react-native';
import {useTranslations} from "@/contexts/LangueProvider";
import {ThemedText} from "@/components/ui/ThemedText";
import {useEffect, useState} from "react";
import {Story} from "@/models/StoryModel";
import { getLocales } from 'expo-localization';
import axios from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";
import StoriesScreen from "@/screens/StoriesScreen";
import {getCaracters, getCaracterTags, getPlaces, getPlaceTags} from "@/hooks/api";
import {useUser} from "@/contexts/UserProvider";
import Step1 from "@/components/generatorSteps/Step1";
import Step2 from "@/components/generatorSteps/Step2";
import Step3 from "@/components/generatorSteps/Step3";
import Step4 from "@/components/generatorSteps/Step4";
import Step5 from "@/components/generatorSteps/Step5";
import StepContainer from "@/components/StepContainer";
import {useSafeAreaInsets} from "react-native-safe-area-context";

export default function HomeScreen() {
    const locale = getLocales()[0]?.languageCode || 'en';
    const { t } = useTranslations();
    const {currentStep, setCurrentStep} = useUser()

    const [tab, setTab] = useState('generate')
    const safearea = useSafeAreaInsets()
    const [data, setData] = useState<Story>({
        locale: locale,
        caracters: [],
        mainCaracter: '',
        places: [],
        ageRange: 3,
        time: 2,
        genres: [],
        moral: true,
        inputCustom: ''
    })

    useEffect(() => {
        if (currentStep === 0) {
            setData({
                locale: locale,
                caracters: [],
                mainCaracter: '',
                places: [],
                ageRange: 5,
                time: 3,
                genres: [],
                moral: false,
                inputCustom: ''
            })
        }
    }, [currentStep]);

    const [caracterTags, setCaracterTags] = useState([]);
    const [loadingCaracterTags, setLoadingCaracterTags] = useState(true);
    const [limitCaracterTags, setLimitCaracterTags] = useState(20)
    const [offsetCaracterTags, setOffsetCaracterTags] = useState(0)

    const [caracters, setCaracters] = useState([]);
    const [loadingCaracters, setLoadingCaracters] = useState(true);
    const [limitCaracters, setLimitCaracters] = useState(100)
    const [offsetCaracters, setOffsetCaracters] = useState(0)

    const [placeTags, setPlaceTags] = useState([]);
    const [loadingPlaceTags, setLoadingPlaceTags] = useState(true);
    const [limitPlaceTags, setLimitPlaceTags] = useState(20)
    const [offsetPlaceTags, setOffsetPlaceTags] = useState(0)

    const [places, setPlaces] = useState([]);
    const [loadingPlaces, setLoadingPlaces] = useState(true);
    const [limitPlaces, setLimitPlaces] = useState(100)
    const [offsetPlaces, setOffsetPlaces] = useState(0)

    useEffect(() => {
        async function fetchCaracters() {
            setLoadingCaracters(true);
            try {
                const response = await getCaracters({}, offsetCaracters, limitCaracters);
                setCaracters(response);
            } catch (error) {
                setLoadingCaracters(false)
            } finally {
                setLoadingCaracters(false);
            }
        }

        async function fetchCategories() {
            setLoadingCaracterTags(true);
            try {
                const response = await getCaracterTags({}, offsetCaracterTags, limitCaracterTags);
                setCaracterTags(response);
            } catch (error) {
                setLoadingCaracterTags(false)
            } finally {
                setLoadingCaracterTags(false);
            }
        }

        async function fetchPlaces() {
            setLoadingPlaces(true);
            try {
                const response = await getPlaces({}, offsetPlaces, limitPlaces);
                setPlaces(response);
            } catch (error) {
                setLoadingPlaces(false)
            } finally {
                setLoadingPlaces(false);
            }
        }

        async function fetchPlaceTags() {
            setLoadingPlaceTags(true);
            try {
                const response = await getPlaceTags({}, offsetPlaceTags, limitPlaceTags);
                setPlaceTags(response);
            } catch (error) {
                setLoadingPlaceTags(false)
            } finally {
                setLoadingPlaceTags(false);
            }
        }

        fetchCategories();
        fetchCaracters();
        fetchPlaces();
        fetchPlaceTags();
    }, [limitCaracterTags, limitCaracters, offsetCaracterTags, offsetCaracters, offsetPlaces, limitPlaces, offsetPlaceTags, limitPlaceTags]);

    const [error, setError] = useState<string>('')
    const [loading, setLoading] = useState<boolean>(false)

    const steps = [
        {id: 1, content: <Step1 />},
        {id: 2, content: <Step2 data={data} setData={setData} caracterTags={caracterTags} caracters={caracters} />},
        {id: 3, content: <Step3 data={data} setData={setData} placeTags={placeTags} places={places} />},
        {id: 4, content: <Step4 data={data} setData={setData} />},
        {id: 5, content: <Step5 />},
    ];

    const handleNext = () => {
        if (currentStep < steps.length - 1) {
            setCurrentStep(currentStep + 1);
        }
    };

    const handlePrev = () => {
        if (currentStep > 0) {
            setCurrentStep(currentStep - 1);
        }
    };

    const handleSubmit = async () => {
        setCurrentStep(currentStep + 1)
        setError('');
        setLoading(true);
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
                setCurrentStep(0)
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
        }
    };

    return (
        <>
            <SafeAreaView style={{flex: 1}}>
                <View style={{ flexDirection: 'row', alignItems: 'center', gap: 16, padding: 16}}>
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
                    <View style={{paddingBottom: safearea.bottom, position: 'relative'}}>
                        <StepContainer
                            loading={loading}
                            steps={steps}
                            currentStep={currentStep}
                            handleNext={handleNext}
                            handlePrev={handlePrev}
                            handleSubmit={handleSubmit}
                        />
                    </View>
                )}
                {tab === 'stories' && (
                    <StoriesScreen />
                )}
            </SafeAreaView>
        </>
    )
}