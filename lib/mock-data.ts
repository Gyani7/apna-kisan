import { Post } from './types';

export const MOCK_POSTS: Post[] = [
  {
    id: '1',
    userId: 'u1',
    farmerName: 'Ramesh Kumar',
    farmerAvatar: null,
    location: 'Amritsar, Punjab',
    content:
      'Aaj hamari gehun ki fasal bahut achhi lag rahi hai! Is saal acchi barish ki wajah se paidawar zyada hogi. Kya aap bhi apni fasal ki taaza khabar share karte hain?',
    imageUrl: 'https://images.pexels.com/photos/265216/pexels-photo-265216.jpeg',
    likesCount: 142,
    commentsCount: 38,
    isLiked: false,
    createdAt: '2026-06-04T08:30:00Z',
    tags: ['Wheat', 'Punjab', 'Harvest'],
  },
  {
    id: '2',
    userId: 'u2',
    farmerName: 'Sunita Devi',
    farmerAvatar: null,
    location: 'Nashik, Maharashtra',
    content:
      'Angoor ki nai variety try ki hai is baar. Organic farming se quality mein kaafi sudhar aaya hai. Kaun kaun organic farming kar raha hai? #OrganicFarming',
    imageUrl: 'https://images.pexels.com/photos/2294471/pexels-photo-2294471.jpeg',
    likesCount: 98,
    commentsCount: 21,
    isLiked: true,
    createdAt: '2026-06-04T07:15:00Z',
    tags: ['Grapes', 'Organic', 'Maharashtra'],
  },
  {
    id: '3',
    userId: 'u3',
    farmerName: 'Arjun Patel',
    farmerAvatar: null,
    location: 'Anand, Gujarat',
    content:
      'Drip irrigation system lagaya hai khet mein — paani ki bachat 40% tak hui hai aur fasal bhi zyada healthy lag rahi hai. Kisi ko bhi drip system ke baare mein jaankari chahiye to message karein.',
    imageUrl: 'https://images.pexels.com/photos/1453499/pexels-photo-1453499.jpeg',
    likesCount: 215,
    commentsCount: 57,
    isLiked: false,
    createdAt: '2026-06-03T18:45:00Z',
    tags: ['Drip Irrigation', 'Water Saving', 'Gujarat'],
  },
  {
    id: '4',
    userId: 'u4',
    farmerName: 'Meera Sharma',
    farmerAvatar: null,
    location: 'Jaipur, Rajasthan',
    content:
      'Sarson ki fasal mein yellow mosaic virus ka attack hua hai. Kisi ke paas effective treatment hai? Please help! Kaafi nuksaan ho sakta hai agar samay par ilaaj na hua.',
    imageUrl: null,
    likesCount: 34,
    commentsCount: 89,
    isLiked: false,
    createdAt: '2026-06-03T14:20:00Z',
    tags: ['Mustard', 'Pest Control', 'Help'],
  },
  {
    id: '5',
    userId: 'u5',
    farmerName: 'Vijay Reddy',
    farmerAvatar: null,
    location: 'Warangal, Telangana',
    content:
      'Is saal cotton ka MSP badhne ki khabar ne khushi di! Sarkar ka yeh kadam kisan bhai-behno ke liye bahut faydemand hai. Apni raay share karein.',
    imageUrl: 'https://images.pexels.com/photos/3902882/pexels-photo-3902882.jpeg',
    likesCount: 312,
    commentsCount: 64,
    isLiked: true,
    createdAt: '2026-06-03T11:00:00Z',
    tags: ['Cotton', 'MSP', 'Policy'],
  },
];

export function timeAgo(dateString: string): string {
  const now = new Date();
  const date = new Date(dateString);
  const diff = Math.floor((now.getTime() - date.getTime()) / 1000);

  if (diff < 60) return 'abhi';
  if (diff < 3600) return `${Math.floor(diff / 60)}m pehle`;
  if (diff < 86400) return `${Math.floor(diff / 3600)}h pehle`;
  return `${Math.floor(diff / 86400)}d pehle`;
}

export function formatCount(count: number): string {
  if (count >= 1000) return `${(count / 1000).toFixed(1)}k`;
  return count.toString();
}
