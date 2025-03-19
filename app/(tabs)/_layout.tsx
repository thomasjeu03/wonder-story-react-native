import { Tabs } from 'expo-router';
import { Platform } from 'react-native';

import { HapticTab } from '@/components/HapticTab';
import TabBarBackground from '@/components/ui/TabBarBackground';
import { Colors } from '@/constants/Colors';
import { useColorScheme } from '@/hooks/useColorScheme';
import {Home, SquareKanban} from "lucide-react-native";
import {useTranslations} from "@/contexts/LangueProvider";

export default function TabLayout() {
  const colorScheme = useColorScheme();
  const { t } = useTranslations();

  return (
    <Tabs
      screenOptions={{
        tabBarActiveTintColor: Colors[colorScheme ?? 'light'].tint,
        headerShown: false,
        tabBarButton: HapticTab,
        tabBarBackground: TabBarBackground,
        tabBarStyle: Platform.select({
          ios: {
            position: 'absolute',
            backgroundColor: 'transparent',
            borderTopWidth: 0,
            elevation: 0,
          },
        }),
        tabBarAllowFontScaling: false
      }}>
        <Tabs.Screen name="index" options={{
            title: t('home'),
            tabBarLabel: t('home'),
            tabBarIcon: ({ color, size }) =>
                <Home size={size} color={color} />
          }}
        />
        <Tabs.Screen name="stories" options={{
            title: t('stories'),
            tabBarLabel: t('stories'),
            href: '/stories',
            tabBarIcon: ({ color, size }) =>
                <SquareKanban size={size} color={color} />
          }}
        />
    </Tabs>
  );
}
