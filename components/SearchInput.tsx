import {
  View,
  Text,
  TextInputProps,
  TextInput,
  TouchableOpacity,
  Image,
} from "react-native";
import React, { useState } from "react";
import { icons } from "../constants";

const SearchInput = ({
  value,
  handleChangeText,
  otherStyles,
  keyboardType,
}: {
  value?: string;
  handleChangeText?: (text: string) => void;
  otherStyles?: TextInputProps["className"];
  keyboardType?: TextInputProps["keyboardType"];
}) => {
  const [showPassword, setShowPassword] = useState(false);

  return (
    <View className="w-full h-16 px-4 bg-black-100 border-black-200 border-2 rounded-2xl focus:border-secondary items-center flex-row space-x-4">
      <TextInput
        className="flex-1 text-white font-pregular mt-1.5 text-base "
        value={value}
        onChangeText={handleChangeText}
        keyboardType={keyboardType}
        placeholderTextColor="#7b7b8b"
        placeholder="Search for a video topic"
      />
      <TouchableOpacity>
        <Image source={icons.search} resizeMode="contain" className="w-5 h-5" />
      </TouchableOpacity>
    </View>
  );
};

export default SearchInput;
