import React, { useEffect, useState } from "react";
import {
  Text,
  View,
  StyleSheet,
  ImageBackground,
  ImageStyle,
} from "react-native";
import { getImageUri } from "../utils";

interface OptimisedImageBackgroundProps {
  imageUri: string;
  children?: React.ReactNode;
  style?: ImageStyle;
}

const OptimisedImageBackground = ({
  imageUri,
  children,
  style,
  ...props
}: OptimisedImageBackgroundProps) => {
  const [renderUri, setRenderUri] = useState<ImageUriInfo | null>(null);

  const getSetRenderUri = async () => {
    const res = await getImageUri(imageUri);
    setRenderUri(res);
  };

  useEffect(() => {
    getSetRenderUri();
  }, []);

  if (!renderUri) return null;

  return (
    <ImageBackground {...props} style={style} source={{ uri: renderUri.uri }}>
      {children}
    </ImageBackground>
  );
};
export default OptimisedImageBackground;
