import 'server-only';

const reels = [
  {
    id: '1',
    videoUrl: '/reels/reel1.mp4',
    caption: 'Check out my wheat crop this season! #agriculture #wheat',
    author: {
      name: 'Rakesh Kumar',
      avatar: '/avatars/rakesh.png',
    },
    likes: 150,
  },
  {
    id: '2',
    videoUrl: '/reels/reel2.mp4',
    caption: 'Tips for organic farming. #organic #farming',
    author: {
      name: 'Sunita Devi',
      avatar: '/avatars/sunita.png',
    },
    likes: 250,
  },
  // Add more reels as needed
];

export async function getAllReels() {
  return reels;
}
