/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * Generated with the TypeScript template
 * https://github.com/react-native-community/react-native-template-typescript
 *
 * @format
 */
import 'react-native-reanimated';
import React, {useEffect, useState, type PropsWithChildren} from 'react';
import {
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  useColorScheme,
  useWindowDimensions,
  View,
} from 'react-native';
import {
  Camera,
  CameraPermissionStatus,
  useCameraDevices,
  useFrameProcessor,
} from 'react-native-vision-camera';

import {
  Colors,
  DebugInstructions,
  Header,
  LearnMoreLinks,
  ReloadInstructions,
} from 'react-native/Libraries/NewAppScreen';
import {runOnJS} from 'react-native-reanimated';

const Section: React.FC<
  PropsWithChildren<{
    title: string;
  }>
> = ({children, title}) => {
  const isDarkMode = useColorScheme() === 'dark';
  return (
    <View style={styles.sectionContainer}>
      <Text
        style={[
          styles.sectionTitle,
          {
            color: isDarkMode ? Colors.white : Colors.black,
          },
        ]}>
        {title}
      </Text>
      <Text
        style={[
          styles.sectionDescription,
          {
            color: isDarkMode ? Colors.light : Colors.dark,
          },
        ]}>
        {children}
      </Text>
    </View>
  );
};

const useCameraPermission = () => {
  const [cameraPermission, setCamerPermission] =
    useState<CameraPermissionStatus>();
  // const [microphonePermission, setMicrophonePermission] = useRecoilState(microphonePermissinoState);

  useEffect(() => {
    Camera.getCameraPermissionStatus().then(setCamerPermission);
  }, []);

  useEffect(() => {
    if (cameraPermission && cameraPermission !== 'authorized') {
      Camera.requestCameraPermission().then(setCamerPermission);
    }
  }, [cameraPermission]);

  return cameraPermission;
};

const CameraView = () => {
  const device = useCameraDevices('wide-angle-camera');
  const {width, height} = useWindowDimensions();

  const frameProcessor = useFrameProcessor(frame => {
    'worklet';
    console.info(__xyz(frame));
  }, []);
  return device.front ? (
    <Camera
      device={device.front}
      style={{width, height}}
      frameProcessor={frameProcessor}
      frameProcessorFps={30}
      isActive
    />
  ) : null;
};
const App = () => {
  const isDarkMode = useColorScheme() === 'dark';

  const backgroundStyle = {
    backgroundColor: isDarkMode ? Colors.darker : Colors.lighter,
  };

  const cameraPermission = useCameraPermission();

  return (
    <SafeAreaView style={backgroundStyle}>
      <StatusBar barStyle={isDarkMode ? 'light-content' : 'dark-content'} />
      {cameraPermission === 'authorized' && <CameraView />}
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  sectionContainer: {
    marginTop: 32,
    paddingHorizontal: 24,
  },
  sectionTitle: {
    fontSize: 24,
    fontWeight: '600',
  },
  sectionDescription: {
    marginTop: 8,
    fontSize: 18,
    fontWeight: '400',
  },
  highlight: {
    fontWeight: '700',
  },
});

export default App;
