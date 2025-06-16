// Centralized announcement store with real-time updates
type Announcement = {
  id: number
  title: string
  content: string
  author: string
  authorRole: string
  date: string
  category: string
  priority: string
  status: string
  likes: number
  comments: number
  pinned: boolean
  image: string
}

// Initial announcements data
const initialAnnouncements: Announcement[] = [
  {
    id: 1,
    title: "Guild Election Nominations Now Open",
    content:
      "We are excited to announce that nominations for the 2024 Guild Council elections are now open! Students interested in serving their fellow students can submit their nomination forms starting today. The nomination period will run until April 10th, 2024. Election campaigns will begin on April 12th, and voting will take place on April 15th, 2024.",
    author: "Sarah Nakato",
    authorRole: "Guild President",
    date: "2024-03-30",
    category: "Elections",
    priority: "high",
    status: "published",
    likes: 45,
    comments: 12,
    pinned: true,
    image: "/placeholder.svg?height=200&width=400",
  },
  {
    id: 2,
    title: "Library Hours Extended During Exam Period",
    content:
      "To support students during the upcoming examination period, the university library will extend its operating hours. Starting April 1st, the library will be open from 6:00 AM to 11:00 PM on weekdays and 8:00 AM to 8:00 PM on weekends. Additional study spaces have been arranged in the conference halls.",
    author: "Peter Kato",
    authorRole: "Academic Minister",
    date: "2024-03-29",
    category: "Academic",
    priority: "medium",
    status: "published",
    likes: 78,
    comments: 8,
    pinned: false,
    image: "/placeholder.svg?height=200&width=400",
  },
  {
    id: 3,
    title: "New Sports Equipment Available",
    content:
      "Great news for all sports enthusiasts! The guild has successfully acquired new sports equipment including basketball hoops, volleyball nets, football goals, and table tennis tables. The equipment is now available for use at the sports complex. Students can book equipment through the sports office.",
    author: "Mary Nakirya",
    authorRole: "Sports Minister",
    date: "2024-03-28",
    category: "Sports",
    priority: "medium",
    status: "published",
    likes: 92,
    comments: 15,
    pinned: false,
    image: "/placeholder.svg?height=200&width=400",
  },
]

// Simple in-memory store with event listeners
let announcementsStore = [...initialAnnouncements]
const listeners: Array<() => void> = []

// Event listener management
const addListener = (listener: () => void) => {
  listeners.push(listener)
  return () => {
    const index = listeners.indexOf(listener)
    if (index > -1) {
      listeners.splice(index, 1)
    }
  }
}

const notifyListeners = () => {
  listeners.forEach((listener) => listener())
}

export const announcementStore = {
  getAnnouncements: () => [...announcementsStore],

  addAnnouncement: (announcement: Omit<Announcement, "id" | "likes" | "comments">) => {
    const newAnnouncement = {
      ...announcement,
      id: Date.now(),
      likes: 0,
      comments: 0,
    }
    announcementsStore = [newAnnouncement, ...announcementsStore]
    notifyListeners()
    return newAnnouncement
  },

  updateAnnouncement: (id: number, updates: Partial<Announcement>) => {
    announcementsStore = announcementsStore.map((announcement) =>
      announcement.id === id ? { ...announcement, ...updates } : announcement,
    )
    notifyListeners()
    return announcementsStore.find((announcement) => announcement.id === id)
  },

  deleteAnnouncement: (id: number) => {
    announcementsStore = announcementsStore.filter((announcement) => announcement.id !== id)
    notifyListeners()
    return true
  },

  getAnnouncementById: (id: number) => {
    return announcementsStore.find((announcement) => announcement.id === id)
  },

  // Subscribe to changes
  subscribe: addListener,
}

export type { Announcement }
