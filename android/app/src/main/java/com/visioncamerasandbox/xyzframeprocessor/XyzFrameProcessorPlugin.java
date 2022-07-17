package com.visioncamerasandbox.xyzframeprocessor;

import androidx.camera.core.ImageProxy;
import com.facebook.react.bridge.WritableNativeArray;
import com.mrousavy.camera.frameprocessor.FrameProcessorPlugin;

public class XyzFrameProcessorPlugin extends FrameProcessorPlugin {
  @Override
  public Object callback(ImageProxy image, Object[] params) {
    return image;
  }

  public XyzFrameProcessorPlugin() {
    super("xyz");
  }
}