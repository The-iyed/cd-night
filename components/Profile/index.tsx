import {Text, View} from "@/components/Themed";
import {findUser} from "@/data";
import {UserRound, UserRoundCheck} from "@tamagui/lucide-icons";
import {useState} from "react";
import {Image, StyleSheet} from "react-native";
import {Avatar, Button} from "tamagui";

export default function ProfilePage({id}: { id: null | string }) {
    const [followed, setFollow] = useState(false);
    const profile = findUser(`${id ?? "0001"}`);
    const Badge1 = require("../../assets/images/badge1.png");
    const Badge2 = require("../../assets/images/badge2.png");
    const Badge3 = require("../../assets/images/badge3.png");
    return (
        <View style={styles.container}>
            <View style={{...styles.flexColumn, ...styles.header}}>
                <View>
                    {profile?.stats?.rank && profile?.stats?.rank < 100 && (
                        <Image
                            style={styles.badge}
                            source={
                                profile?.stats.rank < 3
                                    ? Badge1
                                    : profile?.stats.rank < 50
                                        ? Badge2
                                        : Badge3
                            }
                        />
                    )}

                    <Image
                        style={styles.verified}
                        source={require("../../assets/images/verified.png")}
                    />

                    <Avatar circular size="$10">
                        <Avatar.Image
                            accessibilityLabel="Nate Wienert"
                            src={profile?.avatar}
                        />
                        <Avatar.Fallback delayMs={600} backgroundColor="$blue10"/>
                    </Avatar>
                </View>
                <View style={{...styles.flexColumn}}>
                    <Text style={styles.title}>{profile?.userName}</Text>
                    <Text>{profile?.description}</Text>
                </View>
                <View style={{...styles.flexRow, ...styles.profileInfo}}>
                    <View style={{...styles.flexColumn, gap: 5}}>
                        <Text style={styles.profileTitle}>Followers </Text>
                        <Text style={styles.profileSubTitle}>
                            {profile?.stats.followers}
                        </Text>
                    </View>
                    <View style={{...styles.flexColumn, gap: 5}}>
                        <Text style={styles.profileTitle}>Posts </Text>
                        <Text style={styles.profileSubTitle}>{profile?.stats.posts}</Text>
                    </View>
                    <View style={{...styles.flexColumn, gap: 5}}>
                        <Text style={styles.profileTitle}>Rank </Text>
                        <Text style={styles.profileSubTitle}>{profile?.stats.rank}</Text>
                    </View>
                </View>
                <View style={styles.follow}>
                    <Button
                        theme="active"
                        onPress={() => setFollow(prev => !prev)}
                        alignSelf="center"
                        style={followed ? styles.followBtn__active : styles.followBtn}
                        icon={followed ? UserRoundCheck : UserRound}
                        size="$3">
                        {followed ? "Followed" : "Follow"}
                    </Button>
                </View>
            </View>
            {/* <TabsComponent /> */}
            {/* <View style={styles.separator} lightColor="#eee" darkColor="rgba(255,255,255,0.1)" />
      <EditScreenInfo path="app/(tabs)/index.tsx" />
      <ImagePickerExample/> */}
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        display: "flex",
        flexDirection: "column",
        alignItems: "flex-start",
        justifyContent: "flex-start",
        height: "100%",
        width: "100%",
        paddingTop: 50,
    },
    badge: {
        width: 110,
        height: 127,
        position: "absolute",
        zIndex: 2,
        top: -20,
        left: -5,
    },
    verified: {
        width: 25,
        height: 25,
        position: "absolute",
        zIndex: 4,
        bottom: 0,
        right: 10,
    },
    avatarHolder: {
        position: "relative",
    },
    title: {
        fontSize: 20,
        fontWeight: "bold",
    },
    separator: {
        marginVertical: 30,
        height: 1,
        width: "80%",
    },
    flexRow: {
        display: "flex",
        flexDirection: "row",
        justifyContent: "center",
        alignItems: "center",
    },
    flexColumn: {
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
    },
    header: {
        width: "100%",
        gap: 10,
        borderBottomWidth: 1,
        borderBottomColor: "#e5e5e5",
    },
    profileInfo: {
        width: "100%",
        gap: 80,
        padding: 20,
    },
    profileTitle: {
        fontSize: 14,
        fontWeight: "bold",
    },
    profileSubTitle: {
        fontSize: 12,
    },
    follow: {
        width: 100,
        paddingBottom: 20,
    },
    followBtn: {
        paddingRight: 30,
        gap: 3,
        backgroundColor: "#00b4d8",
    },
    followBtn__active: {
        borderColor: "#000",
        borderWidth: 1,
        backgroundColor: "#ffbf69",
        color: "#000",
    },
});
