// Centralized guild member store with real-time updates
type GuildMember = {
  id: number
  name: string
  position: string
  department: string
  year: string
  email: string
  phone: string
  office: string
  responsibilities: string[]
  image: string
  status: string
  joinDate: string
  bio?: string
}

// Initial guild members data
const initialMembers: GuildMember[] = [
  {
    id: 1,
    name: "Sarah Nakato",
    position: "Guild President",
    department: "Business Administration",
    year: "Year 3",
    email: "sarah.nakato@ndejje.ac.ug",
    phone: "+256 700 123 456",
    office: "Guild Office - Room 101",
    responsibilities: ["Student Welfare", "Academic Affairs", "Leadership"],
    image: "/placeholder.svg?height=100&width=100",
    status: "active",
    joinDate: "2024-01-15",
    bio: "Passionate about student welfare and academic excellence.",
  },
  {
    id: 2,
    name: "James Mukasa",
    position: "Vice President",
    department: "Computer Science",
    year: "Year 4",
    email: "james.mukasa@ndejje.ac.ug",
    phone: "+256 700 234 567",
    office: "Guild Office - Room 102",
    responsibilities: ["Technology", "Innovation", "Student Projects"],
    image: "/placeholder.svg?height=100&width=100",
    status: "active",
    joinDate: "2024-01-15",
    bio: "Leading digital transformation initiatives for students.",
  },
  {
    id: 3,
    name: "Grace Namuli",
    position: "Secretary General",
    department: "Mass Communication",
    year: "Year 2",
    email: "grace.namuli@ndejje.ac.ug",
    phone: "+256 700 345 678",
    office: "Guild Office - Room 103",
    responsibilities: ["Communications", "Documentation", "Public Relations"],
    image: "/placeholder.svg?height=100&width=100",
    status: "active",
    joinDate: "2024-01-15",
    bio: "Ensuring effective communication across the student body.",
  },
  {
    id: 4,
    name: "David Ssemakula",
    position: "Treasurer",
    department: "Accounting & Finance",
    year: "Year 3",
    email: "david.ssemakula@ndejje.ac.ug",
    phone: "+256 700 456 789",
    office: "Guild Office - Room 104",
    responsibilities: ["Finance", "Budget Management", "Fundraising"],
    image: "/placeholder.svg?height=100&width=100",
    status: "active",
    joinDate: "2024-01-15",
    bio: "Managing guild finances and student fund initiatives.",
  },
  {
    id: 5,
    name: "Mary Nakirya",
    position: "Sports Minister",
    department: "Sports Science",
    year: "Year 2",
    email: "mary.nakirya@ndejje.ac.ug",
    phone: "+256 700 567 890",
    office: "Sports Complex - Office 201",
    responsibilities: ["Sports Activities", "Recreation", "Health & Fitness"],
    image: "/placeholder.svg?height=100&width=100",
    status: "active",
    joinDate: "2024-01-15",
    bio: "Promoting sports and wellness activities on campus.",
  },
  {
    id: 6,
    name: "Peter Kato",
    position: "Academic Minister",
    department: "Education",
    year: "Year 4",
    email: "peter.kato@ndejje.ac.ug",
    phone: "+256 700 678 901",
    office: "Academic Block - Room 305",
    responsibilities: ["Academic Affairs", "Student Support", "Research"],
    image: "/placeholder.svg?height=100&width=100",
    status: "active",
    joinDate: "2024-01-15",
    bio: "Supporting academic excellence and student research initiatives.",
  },
]

// Simple in-memory store with event listeners
let membersStore = [...initialMembers]
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

export const guildMemberStore = {
  getMembers: () => [...membersStore],

  addMember: (member: Omit<GuildMember, "id" | "joinDate">) => {
    const newMember = {
      ...member,
      id: Date.now(),
      joinDate: new Date().toISOString().split("T")[0],
    }
    membersStore = [newMember, ...membersStore]
    notifyListeners()
    return newMember
  },

  updateMember: (id: number, updates: Partial<GuildMember>) => {
    membersStore = membersStore.map((member) => (member.id === id ? { ...member, ...updates } : member))
    notifyListeners()
    return membersStore.find((member) => member.id === id)
  },

  deleteMember: (id: number) => {
    membersStore = membersStore.filter((member) => member.id !== id)
    notifyListeners()
    return true
  },

  getMemberById: (id: number) => {
    return membersStore.find((member) => member.id === id)
  },

  getMembersByPosition: (position: string) => {
    return membersStore.filter((member) => member.position === position)
  },

  // Subscribe to changes
  subscribe: addListener,
}

export type { GuildMember }
