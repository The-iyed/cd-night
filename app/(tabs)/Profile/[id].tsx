import ProfilePage from "@/components/Profile";
import { useLocalSearchParams } from "expo-router";
import React from "react";


export default function Profile() {
  const { id } = useLocalSearchParams<{ id: string  }>();
  return <ProfilePage id={id!} />;
}
