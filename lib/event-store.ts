// Enhanced event store with real-time updates and listeners
type Event = {
  id: number
  title: string
  date: string
  time: string
  location: string
  category: string
  description: string
  attendees: number
  status: string
  image: string
}

// Initial events data
const initialEvents: Event[] = [
  {
    id: 1,
    title: "Guild Elections 2024",
    date: "2024-04-15",
    time: "9:00 AM - 5:00 PM",
    location: "Main Auditorium",
    category: "Elections",
    description: "Annual guild council elections. All students are encouraged to vote for their preferred candidates.",
    attendees: 1200,
    status: "upcoming",
    image: "/placeholder.svg?height=200&width=300",
  },
  {
    id: 2,
    title: "Career Fair 2024",
    date: "2024-04-08",
    time: "10:00 AM - 4:00 PM",
    location: "Sports Complex",
    category: "Career",
    description:
      "Meet with potential employers, learn about internship opportunities, and network with industry professionals.",
    attendees: 800,
    status: "upcoming",
    image: "/placeholder.svg?height=200&width=300",
  },
  {
    id: 3,
    title: "Cultural Night",
    date: "2024-04-20",
    time: "6:00 PM - 11:00 PM",
    location: "University Grounds",
    category: "Cultural",
    description: "Celebrate the diversity of our student body with performances, food, and cultural exhibitions.",
    attendees: 600,
    status: "upcoming",
    image: "/placeholder.svg?height=200&width=300",
  },
  {
    id: 4,
    title: "Academic Excellence Awards",
    date: "2024-04-25",
    time: "2:00 PM - 5:00 PM",
    location: "Conference Hall",
    category: "Academic",
    description: "Recognition ceremony for outstanding academic achievements and student contributions.",
    attendees: 400,
    status: "upcoming",
    image: "/placeholder.svg?height=200&width=300",
  },
  {
    id: 5,
    title: "Sports Tournament Finals",
    date: "2024-04-30",
    time: "1:00 PM - 6:00 PM",
    location: "Sports Fields",
    category: "Sports",
    description: "Final matches of the inter-faculty sports tournament. Come support your faculty teams!",
    attendees: 1000,
    status: "upcoming",
    image: "/placeholder.svg?height=200&width=300",
  },
  {
    id: 6,
    title: "Mental Health Awareness Week",
    date: "2024-05-06",
    time: "All Week",
    location: "Various Locations",
    category: "Wellness",
    description:
      "A week dedicated to mental health awareness with workshops, counseling sessions, and wellness activities.",
    attendees: 500,
    status: "upcoming",
    image: "/placeholder.svg?height=200&width=300",
  },
]

// Simple in-memory store with event listeners
let eventsStore = [...initialEvents]
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

export const eventStore = {
  getEvents: () => [...eventsStore],

  addEvent: (event: Omit<Event, "id">) => {
    const newEvent = {
      ...event,
      id: Date.now(),
    }
    eventsStore = [newEvent, ...eventsStore]
    notifyListeners()
    return newEvent
  },

  updateEvent: (id: number, updates: Partial<Event>) => {
    eventsStore = eventsStore.map((event) => (event.id === id ? { ...event, ...updates } : event))
    notifyListeners()
    return eventsStore.find((event) => event.id === id)
  },

  deleteEvent: (id: number) => {
    eventsStore = eventsStore.filter((event) => event.id !== id)
    notifyListeners()
    return true
  },

  getEventById: (id: number) => {
    return eventsStore.find((event) => event.id === id)
  },

  // Subscribe to changes
  subscribe: addListener,
}

export type { Event }
