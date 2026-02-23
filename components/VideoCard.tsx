import React from 'react';
import { View, Text, TouchableOpacity, Share } from 'react-native';
import { Video } from 'expo-av';
import { Heart, MessageCircle, Share2, Crown } from 'lucide-react-native';

/**
 * VideoCard component displays an individual post with a looping video and
 * overlay controls similar to TikTok. Includes like, comment, share and
 * premium buttons. When the premium button is pressed, the parent component
 * should open a modal offering subscription or token purchase options.
 */
export default function VideoCard({ post, isMinor, onOpenPremium }: any) {
  const handleShare = async () => {
    try {
      await Share.share({
        message: `Mira esta IA en IATOK: ${post.caption}\n\nDescarga IATOK ahora → iatok.app`,
      });
    } catch (error) {
      console.error('Error al compartir', error);
    }
  };

  return (
    <View style={{ height: '100%', position: 'relative' }}>
      <Video
        source={{ uri: post.video_url }}
        style={{ flex: 1 }}
        resizeMode="cover"
        shouldPlay
        isLooping
        isMuted
      />

      {/* Side actions similar to TikTok */}
      <View style={{ position: 'absolute', right: 20, bottom: 120 }}>
        <TouchableOpacity onPress={() => { /* TODO: like functionality */ }}>
          <Heart size={40} color="#fff" />
        </TouchableOpacity>
        <TouchableOpacity onPress={() => { /* TODO: open chat */ }}>
          <MessageCircle size={40} color="#fff" />
        </TouchableOpacity>
        <TouchableOpacity onPress={handleShare}>
          <Share2 size={40} color="#fff" />
        </TouchableOpacity>
        <TouchableOpacity onPress={onOpenPremium}>
          <Crown size={40} color="#ffd700" />
        </TouchableOpacity>
      </View>

      {/* Captions and IA name */}
      <View style={{ position: 'absolute', bottom: 80, left: 20 }}>
        <Text style={{ color: '#fff', fontSize: 20, fontWeight: 'bold' }}>@{post.ia_name}</Text>
        <Text style={{ color: '#fff', fontSize: 16 }}>{post.caption}</Text>
      </View>
    </View>
  );
}