import React, { SetStateAction, useState } from 'react'
import { FlatList, ImageBackground, TouchableOpacity } from 'react-native'
import { ThemedText } from './ThemedText';
import { ThemedView } from './ThemedView';
import { Image } from "react-native";
import * as Animatable from "react-native-animatable"
import { Video, ResizeMode } from "expo-av"


interface Creator {
    $collectionId: string;
    $createdAt: string;
    $databaseId: string;
    $id: string;
    $permissions: any[];
    $tenant: string;
    $updatedAt: string;
    accountId: string;
    avatar: string;
    email: string;
    userName: string;
}

interface VideoData {
    $collectionId: string;
    $createdAt: string;
    $databaseId: string;
    $id: string;
    $permissions: any[];
    $tenant: string;
    $updatedAt: string;
    creator: Creator;
    prompt: string;
    thumbnail: string;
    title: string;
    video: string;
}

interface ViewToken {
    index: number;
    isViewable: boolean
    key: SetStateAction<VideoData>
}

const zoom = {
    from: { scale: 0 },
    to: { scale: 1 }
}


const TrendingItem = ({ activeItem, item }: { activeItem: VideoData, item: VideoData }) => {
    const [play, setPlay] = useState(false);
    const [active, setActive] = useState(false);


    return (
        <Animatable.View

            duration={500}
            style={{
                flexDirection: "row",
                width: 190,
                height: 300
            }}>
            {play ? (

                <Video
                    style={{
                        width: 170,
                        height: 240,
                        justifyContent: "center",
                        alignItems: "center",
                        borderRadius: 20,
                        marginLeft: 20,

                    }}
                    source={{ uri: item.video }}
                    resizeMode={ResizeMode.CONTAIN}
                    useNativeControls
                    shouldPlay
                    onLoad={() => {
                        setActive(true);
                    }}
                    onError={(error) => {
                        console.log("Video Error : ", error);
                    }}
                    onPlaybackStatusUpdate={(status) => {
                        if (status.didJustFinish && !status.isLooping) {
                            setPlay(false);
                        }
                    }}
                />

            ) : (
                <ThemedView>
                    <TouchableOpacity onPress={() => setPlay(!play)} style={{ width: 100, height: 150, alignItems: "center", marginLeft: 60 }} >
                        <ImageBackground resizeMode='cover' source={{ uri: item.thumbnail }} style={{ width: 170, height: 240, marginLeft: 20, marginRight: 30, overflow: "hidden", borderRadius: 20, padding: 20 }} />
                    </TouchableOpacity>
                </ThemedView>
            )
            }
        </Animatable.View >
    )
}

const Trending = ({ posts }: { posts: VideoData[] }) => {
    const [activeItem, setActiveItem] = useState(posts[1]);


    const viewableItemsChanged = ({ viewableItems }: { viewableItems: any }) => {
        if (viewableItems.length > 0) {
            setActiveItem(viewableItems[0].key);
        }
    }
    return (
        <FlatList
            data={posts}
            keyExtractor={item => item.$id}
            renderItem={({ item }) => (
                <TrendingItem
                    activeItem={activeItem}
                    item={item}
                />

            )
            }
            onViewableItemsChanged={viewableItemsChanged}
            viewabilityConfig={{ viewAreaCoveragePercentThreshold: 50 }}
            contentOffset={{ x: 100, y: 0 }}
            horizontal
            showsHorizontalScrollIndicator={false}
        />
    )
}

export default Trending


// 2:58:06