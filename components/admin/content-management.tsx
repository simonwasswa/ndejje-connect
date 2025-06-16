"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { FormLabel } from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Switch } from "@/components/ui/switch"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import * as z from "zod"
import { Table, TableBody, TableCaption, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { ImageUpload } from "@/components/ui/image-upload"

const announcementSchema = z.object({
  title: z.string().min(2, {
    message: "Title must be at least 2 characters.",
  }),
  content: z.string().min(10, {
    message: "Content must be at least 10 characters.",
  }),
  author: z.string().min(2, {
    message: "Author must be at least 2 characters.",
  }),
  category: z.string().min(2, {
    message: "Category must be at least 2 characters.",
  }),
  priority: z.enum(["high", "medium", "low"]),
  pinned: z.boolean().default(false),
  image: z.string().optional(),
})

type Announcement = z.infer<typeof announcementSchema>

const ContentManagement = () => {
  const [announcements, setAnnouncements] = useState<Announcement[]>([
    {
      title: "Important Announcement",
      content: "This is a very important announcement. Please read carefully.",
      author: "John Doe",
      category: "General",
      priority: "high",
      pinned: true,
      image: "",
    },
    {
      title: "New Feature Release",
      content: "We are excited to announce the release of our new feature!",
      author: "Jane Smith",
      category: "Technology",
      priority: "medium",
      pinned: false,
      image: "",
    },
  ])

  const [newAnnouncement, setNewAnnouncement] = useState({
    title: "",
    content: "",
    author: "",
    category: "",
    priority: "medium",
    pinned: false,
    image: "",
  })

  const [editingAnnouncement, setEditingAnnouncement] = useState<Announcement>({
    title: "",
    content: "",
    author: "",
    category: "",
    priority: "medium",
    pinned: false,
    image: "",
  })
  const [openEditModal, setOpenEditModal] = useState(false)
  const [announcementToDelete, setAnnouncementToDelete] = useState<Announcement | null>(null)
  const [openDeleteModal, setOpenDeleteModal] = useState(false)

  const form = useForm<z.infer<typeof announcementSchema>>({
    resolver: zodResolver(announcementSchema),
    defaultValues: {
      title: "",
      content: "",
      author: "",
      category: "",
      priority: "medium",
      pinned: false,
      image: "",
    },
  })

  function onSubmit(values: z.infer<typeof announcementSchema>) {
    // Do something with the form values.
    // ✅ This will be type-safe and validated.
    console.log(values)
  }

  const handleCreateAnnouncement = () => {
    setAnnouncements([...announcements, newAnnouncement])
    setNewAnnouncement({
      title: "",
      content: "",
      author: "",
      category: "",
      priority: "medium",
      pinned: false,
      image: "",
    })
  }

  const handleEditAnnouncement = () => {
    setAnnouncements(
      announcements.map((announcement) =>
        announcement.title === editingAnnouncement.title ? editingAnnouncement : announcement,
      ),
    )
    setOpenEditModal(false)
    setEditingAnnouncement({
      title: "",
      content: "",
      author: "",
      category: "",
      priority: "medium",
      pinned: false,
      image: "",
    })
  }

  const handleDeleteAnnouncement = () => {
    if (announcementToDelete) {
      setAnnouncements(announcements.filter((announcement) => announcement.title !== announcementToDelete.title))
      setOpenDeleteModal(false)
      setAnnouncementToDelete(null)
    }
  }

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Content Management</h1>

      {/* Create Announcement Form */}
      <div className="mb-8">
        <h2 className="text-xl font-semibold mb-2">Create Announcement</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <Input
            type="text"
            placeholder="Title"
            value={newAnnouncement.title}
            onChange={(e) => setNewAnnouncement({ ...newAnnouncement, title: e.target.value })}
          />
          <Input
            type="text"
            placeholder="Author"
            value={newAnnouncement.author}
            onChange={(e) => setNewAnnouncement({ ...newAnnouncement, author: e.target.value })}
          />
          <Input
            type="text"
            placeholder="Category"
            value={newAnnouncement.category}
            onChange={(e) => setNewAnnouncement({ ...newAnnouncement, category: e.target.value })}
          />
          <Textarea
            placeholder="Content"
            value={newAnnouncement.content}
            onChange={(e) => setNewAnnouncement({ ...newAnnouncement, content: e.target.value })}
            className="md:col-span-3"
          />
          <div className="md:col-span-2">
            <ImageUpload
              currentImage={newAnnouncement.image}
              onImageChange={(imageUrl) => setNewAnnouncement({ ...newAnnouncement, image: imageUrl })}
              label="Announcement Image (Optional)"
              aspectRatio="landscape"
              className="mt-4"
            />
          </div>
          <Select
            onValueChange={(value) =>
              setNewAnnouncement({ ...newAnnouncement, priority: value as "high" | "medium" | "low" })
            }
          >
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="Priority" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="high">High</SelectItem>
              <SelectItem value="medium">Medium</SelectItem>
              <SelectItem value="low">Low</SelectItem>
            </SelectContent>
          </Select>
          <div className="flex items-center">
            <Switch
              id="pinned"
              checked={newAnnouncement.pinned}
              onCheckedChange={(checked) => setNewAnnouncement({ ...newAnnouncement, pinned: checked })}
            />
            <label
              htmlFor="pinned"
              className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 ml-2"
            >
              Pinned
            </label>
          </div>
          <Button onClick={handleCreateAnnouncement} className="md:col-span-3">
            Create Announcement
          </Button>
        </div>
      </div>

      {/* Announcement List */}
      <div>
        <h2 className="text-xl font-semibold mb-2">Announcements</h2>
        <Table>
          <TableCaption>A list of your recent announcements.</TableCaption>
          <TableHeader>
            <TableRow>
              <TableHead className="w-[100px]">Title</TableHead>
              <TableHead>Author</TableHead>
              <TableHead>Category</TableHead>
              <TableHead>Priority</TableHead>
              <TableHead>Pinned</TableHead>
              <TableHead className="text-right">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {announcements.map((announcement) => (
              <TableRow key={announcement.title}>
                <TableCell className="font-medium">{announcement.title}</TableCell>
                <TableCell>{announcement.author}</TableCell>
                <TableCell>{announcement.category}</TableCell>
                <TableCell>{announcement.priority}</TableCell>
                <TableCell>{announcement.pinned ? "Yes" : "No"}</TableCell>
                <TableCell className="text-right">
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => {
                      setEditingAnnouncement(announcement)
                      setOpenEditModal(true)
                    }}
                  >
                    Edit
                  </Button>
                  <AlertDialog>
                    <AlertDialogTrigger asChild>
                      <Button variant="ghost" size="sm" onClick={() => setAnnouncementToDelete(announcement)}>
                        Delete
                      </Button>
                    </AlertDialogTrigger>
                    <AlertDialogContent>
                      <AlertDialogHeader>
                        <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
                        <AlertDialogDescription>
                          This action cannot be undone. Are you sure you want to delete {announcement.title}?
                        </AlertDialogDescription>
                      </AlertDialogHeader>
                      <AlertDialogFooter>
                        <AlertDialogCancel onClick={() => setAnnouncementToDelete(null)}>Cancel</AlertDialogCancel>
                        <AlertDialogAction onClick={handleDeleteAnnouncement}>Continue</AlertDialogAction>
                      </AlertDialogFooter>
                    </AlertDialogContent>
                  </AlertDialog>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>

      {/* Edit Announcement Modal */}
      <Dialog open={openEditModal} onOpenChange={setOpenEditModal}>
        <DialogTrigger asChild>
          <Button variant="outline">Edit Announcement</Button>
        </DialogTrigger>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>Edit announcement</DialogTitle>
            <DialogDescription>Make changes to your announcement here. Click save when you're done.</DialogDescription>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <div className="grid grid-cols-4 items-center gap-4">
              <FormLabel htmlFor="title">Title</FormLabel>
              <Input
                id="title"
                value={editingAnnouncement.title}
                onChange={(e) => setEditingAnnouncement({ ...editingAnnouncement, title: e.target.value })}
                className="col-span-3"
              />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <FormLabel htmlFor="author">Author</FormLabel>
              <Input
                id="author"
                value={editingAnnouncement.author}
                onChange={(e) => setEditingAnnouncement({ ...editingAnnouncement, author: e.target.value })}
                className="col-span-3"
              />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <FormLabel htmlFor="category">Category</FormLabel>
              <Input
                id="category"
                value={editingAnnouncement.category}
                onChange={(e) => setEditingAnnouncement({ ...editingAnnouncement, category: e.target.value })}
                className="col-span-3"
              />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <FormLabel htmlFor="content">Content</FormLabel>
              <Textarea
                id="content"
                value={editingAnnouncement.content}
                onChange={(e) => setEditingAnnouncement({ ...editingAnnouncement, content: e.target.value })}
                className="col-span-3"
              />
            </div>
            <div className="md:col-span-2">
              <ImageUpload
                currentImage={editingAnnouncement.image}
                onImageChange={(imageUrl) => setEditingAnnouncement({ ...editingAnnouncement, image: imageUrl })}
                label="Announcement Image (Optional)"
                aspectRatio="landscape"
                className="mt-4"
              />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <FormLabel htmlFor="priority">Priority</FormLabel>
              <Select
                onValueChange={(value) =>
                  setEditingAnnouncement({ ...editingAnnouncement, priority: value as "high" | "medium" | "low" })
                }
              >
                <SelectTrigger className="col-span-3">
                  <SelectValue placeholder={editingAnnouncement.priority} />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="high">High</SelectItem>
                  <SelectItem value="medium">Medium</SelectItem>
                  <SelectItem value="low">Low</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="flex items-center">
              <Switch
                id="pinned"
                checked={editingAnnouncement.pinned}
                onCheckedChange={(checked) => setEditingAnnouncement({ ...editingAnnouncement, pinned: checked })}
              />
              <label
                htmlFor="pinned"
                className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 ml-2"
              >
                Pinned
              </label>
            </div>
          </div>
          <DialogFooter>
            <Button type="submit" onClick={handleEditAnnouncement}>
              Save changes
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Delete Announcement Modal */}
      <AlertDialog open={openDeleteModal} onOpenChange={setOpenDeleteModal}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
            <AlertDialogDescription>
              This action cannot be undone. This will permanently delete your announcement and remove your data from our
              servers.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel onClick={() => setOpenDeleteModal(false)}>Cancel</AlertDialogCancel>
            <AlertDialogAction onClick={handleDeleteAnnouncement}>Continue</AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  )
}

export { ContentManagement }
