"use client"
import React, { useState, useEffect } from 'react'
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { FileText, Edit, Send, Trash2, Calendar, User } from "lucide-react"
import { getPoliceCaseDrafts, deletePoliceCaseDraft, submitPoliceCaseDraft } from "@/actions/police"
import { toast } from "sonner"
import { useTransition } from 'react'
import { BeatLoader } from 'react-spinners'

interface PoliceCaseDraft {
  id: string
  caseTitle: string
  caseDescription: string | null
  defendantName: string
  placeOfOffense: string
  nameOfIPO: string
  createdAt: Date
}

export const PoliceDraftsList = () => {
  const [drafts, setDrafts] = useState<PoliceCaseDraft[]>([])
  const [loading, setLoading] = useState(true)
  const [isPending, startTransition] = useTransition()

  useEffect(() => {
    loadDrafts()
  }, [])

  const loadDrafts = async () => {
    try {
      const result = await getPoliceCaseDrafts('')
      if (result) {
        setDrafts(result)
      }
    } catch (error) {
      console.error('Error loading drafts:', error)
      toast.error('Failed to load drafts')
    } finally {
      setLoading(false)
    }
  }

  const handleSubmitDraft = async (draftId: string) => {
    startTransition(async () => {
      try {
        const result = await submitPoliceCaseDraft(draftId)
        if (result.success) {
          toast.success(result.message)
          loadDrafts() // Refresh the list
        } else {
          toast.error(result.error || 'Failed to submit draft')
        }
      } catch (error) {
        console.error('Error submitting draft:', error)
        toast.error('Failed to submit draft')
      }
    })
  }

  const handleDeleteDraft = async (draftId: string) => {
    if (!confirm('Are you sure you want to delete this draft?')) return

    startTransition(async () => {
      try {
        const result = await deletePoliceCaseDraft(draftId)
        if (result.success) {
          toast.success(result.message)
          loadDrafts() // Refresh the list
        } else {
          toast.error(result.error || 'Failed to delete draft')
        }
      } catch (error) {
        console.error('Error deleting draft:', error)
        toast.error('Failed to delete draft')
      }
    })
  }

  if (loading) {
    return (
      <div className="flex justify-center items-center p-8">
        <BeatLoader size={8} color="#3b82f6" />
      </div>
    )
  }

  if (drafts.length === 0) {
    return (
      <Card>
        <CardContent className="flex flex-col items-center justify-center p-8">
          <FileText className="h-12 w-12 text-gray-400 mb-4" />
          <h3 className="text-lg font-semibold text-gray-600 mb-2">No Drafts Found</h3>
          <p className="text-gray-500 text-center">
            You haven't saved any case drafts yet. Create a new case and save it as draft to see it here.
          </p>
        </CardContent>
      </Card>
    )
  }

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold">Case Drafts</h2>
        <Badge variant="secondary">{drafts.length} draft{drafts.length !== 1 ? 's' : ''}</Badge>
      </div>

      <div className="grid gap-4">
        {drafts.map((draft) => (
          <Card key={draft.id} className="hover:shadow-md transition-shadow">
            <CardHeader>
              <div className="flex items-start justify-between">
                <div className="flex-1">
                  <CardTitle className="text-lg">{draft.caseTitle}</CardTitle>
                  <CardDescription className="mt-1">
                    {draft.caseDescription}
                  </CardDescription>
                </div>
                <Badge variant="outline">Draft</Badge>
              </div>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                <div className="flex items-center text-sm text-gray-600">
                  <User className="h-4 w-4 mr-2" />
                  Defendant: {draft.defendantName}
                </div>
                <div className="flex items-center text-sm text-gray-600">
                  <FileText className="h-4 w-4 mr-2" />
                  IPO: {draft.nameOfIPO}
                </div>
                <div className="flex items-center text-sm text-gray-600 md:col-span-2">
                  <Calendar className="h-4 w-4 mr-2" />
                  Created: {new Date(draft.createdAt).toLocaleDateString()}
                </div>
              </div>

              <div className="flex flex-wrap gap-2">
                <Button
                  size="sm"
                  variant="outline"
                  onClick={() => handleSubmitDraft(draft.id)}
                  disabled={isPending}
                >
                  <Send className="h-4 w-4 mr-2" />
                  Submit Case
                </Button>
                <Button
                  size="sm"
                  variant="outline"
                  onClick={() => {/* TODO: Implement edit functionality */}}
                  disabled={isPending}
                >
                  <Edit className="h-4 w-4 mr-2" />
                  Edit
                </Button>
                <Button
                  size="sm"
                  variant="destructive"
                  onClick={() => handleDeleteDraft(draft.id)}
                  disabled={isPending}
                >
                  <Trash2 className="h-4 w-4 mr-2" />
                  Delete
                </Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  )
}
