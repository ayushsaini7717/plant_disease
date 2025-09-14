"use client"

import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Textarea } from "@/components/ui/textarea"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { useIntersectionObserver } from "@/hooks/use-intersection-observer"
import {
  LogOut,
  MessageSquare,
  CheckCircle,
  Clock,
  AlertTriangle,
  Send,
  Users,
  BarChart3,
  Search,
  Trash2,
  Plus,
  TrendingUp,
} from "lucide-react"

interface OfficerDashboardProps {
  user: any
  onLogout: () => void
  isOnline: boolean
}

interface Query {
  id: string
  farmerName: string
  farmerPhone: string
  query: string
  aiResponse: string
  confidence: number
  status: "pending" | "approved" | "escalated" | "rejected"
  timestamp: string
  category: "disease" | "fertilizer" | "pest" | "general"
  priority: "high" | "medium" | "low"
}

interface Officer {
  id: string
  name: string
  email: string
  department: string
  status: "active" | "inactive"
  queriesHandled: number
}

export function OfficerDashboard({ user, onLogout, isOnline }: OfficerDashboardProps) {
  const [activeTab, setActiveTab] = useState<"queries" | "suggestions" | "approved" | "admin" | "analytics">("queries")
  const [selectedQuery, setSelectedQuery] = useState<Query | null>(null)
  const [editedResponse, setEditedResponse] = useState("")
  const [searchTerm, setSearchTerm] = useState("")
  const [filterStatus, setFilterStatus] = useState<string>("all")
  const [newOfficer, setNewOfficer] = useState({ name: "", email: "", department: "" })

  // Intersection observer for animations
  const [ref, isIntersecting] = useIntersectionObserver({
    threshold: 0.1,
  })

  // Mock data
  const [queries, setQueries] = useState<Query[]>([
    {
      id: "1",
      farmerName: "രാജു കുമാർ",
      farmerPhone: "+91 9876543210",
      query: "എന്റെ നെല്ലിൽ ഇലപ്പുള്ളി രോഗം വന്നിട്ടുണ്ട്. ഇലകൾ മഞ്ഞയായി വരുന്നു. എന്ത് ചെയ്യണം?",
      aiResponse: "നിങ്ങളുടെ വിളയിൽ ഇലപ്പുള്ളി രോഗം കാണപ്പെടുന്നു. ചെമ്പ് സൾഫേറ്റ് ലായനി (1 ഗ്രാം/ലിറ്റർ) തളിക്കുക.",
      confidence: 85,
      status: "pending",
      timestamp: "2 hours ago",
      category: "disease",
      priority: "high",
    },
    {
      id: "2",
      farmerName: "സുധ ദേവി",
      farmerPhone: "+91 9876543211",
      query: "തക്കാളിയിൽ പുഴു വന്നിട്ടുണ്ട്. ഇലകളിൽ ദ്വാരങ്ങൾ കാണുന്നു. എന്ത് മരുന്ന് ഇടണം?",
      aiResponse: "തക്കാളി പുഴുവിന് ബയോ പെസ്റ്റിസൈഡ് അല്ലെങ്കിൽ നീം ഓയിൽ ഉപയോഗിക്കുക.",
      confidence: 45,
      status: "escalated",
      timestamp: "4 hours ago",
      category: "pest",
      priority: "medium",
    },
    {
      id: "3",
      farmerName: "അനിൽ വർമ്മ",
      farmerPhone: "+91 9876543212",
      query: "വാഴയിൽ വളം എപ്പോൾ ഇടണം? എത്ര അളവിൽ?",
      aiResponse: "വാഴയ്ക്ക് മാസത്തിൽ ഒരിക്കൽ NPK വളം (19:19:19) 50 ഗ്രാം ഇടുക.",
      confidence: 92,
      status: "approved",
      timestamp: "1 day ago",
      category: "fertilizer",
      priority: "low",
    },
  ])

  const officers: Officer[] = [
    {
      id: "1",
      name: "Dr. രമേശ് കുമാർ",
      email: "ramesh@agri.gov.in",
      department: "Plant Pathology",
      status: "active",
      queriesHandled: 156,
    },
    {
      id: "2",
      name: "സുനിത ദേവി",
      email: "sunitha@agri.gov.in",
      department: "Entomology",
      status: "active",
      queriesHandled: 89,
    },
  ]

  const handleSelectQuery = (query: Query) => {
    setSelectedQuery(query)
    setEditedResponse(query.aiResponse)
  }

  const handleApprove = () => {
    if (selectedQuery) {
      setQueries((prev) => prev.map((q) => (q.id === selectedQuery.id ? { ...q, status: "approved" as const } : q)))
      setSelectedQuery(null)
    }
  }

  const handleReject = () => {
    if (selectedQuery) {
      setQueries((prev) => prev.map((q) => (q.id === selectedQuery.id ? { ...q, status: "rejected" as const } : q)))
      setSelectedQuery(null)
    }
  }

  const handleSendEdited = () => {
    if (selectedQuery && editedResponse) {
      setQueries((prev) =>
        prev.map((q) =>
          q.id === selectedQuery.id ? { ...q, aiResponse: editedResponse, status: "approved" as const } : q,
        ),
      )
      setSelectedQuery(null)
    }
  }

  const handleAddOfficer = () => {
    if (newOfficer.name && newOfficer.email && newOfficer.department) {
      console.log("Adding new officer:", newOfficer)
      setNewOfficer({ name: "", email: "", department: "" })
    }
  }

  const filteredQueries = queries.filter((query) => {
    const matchesSearch =
      query.farmerName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      query.query.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesFilter = filterStatus === "all" || query.status === filterStatus
    return matchesSearch && matchesFilter
  })

  const getConfidenceColor = (confidence: number) => {
    if (confidence >= 70) return "bg-green-500"
    if (confidence >= 50) return "bg-yellow-500"
    return "bg-red-500"
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case "pending":
        return "bg-blue-500"
      case "approved":
        return "bg-green-500"
      case "escalated":
        return "bg-red-500"
      case "rejected":
        return "bg-gray-500"
      default:
        return "bg-gray-500"
    }
  }

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case "high":
        return "bg-red-500"
      case "medium":
        return "bg-yellow-500"
      case "low":
        return "bg-green-500"
      default:
        return "bg-gray-500"
    }
  }

  const getCategoryIcon = (category: string) => {
    switch (category) {
      case "disease":
        return "🦠"
      case "pest":
        return "🐛"
      case "fertilizer":
        return "🌱"
      default:
        return "❓"
    }
  }

  return (
    <div className="min-h-screen bg-slate-900">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-slate-800 border-b border-white/10 p-4"
      >
        <div className="flex justify-between items-center max-w-7xl mx-auto">
          <div>
            <h1 className="text-3xl font-bold bg-gradient-to-r from-green-400 to-lime-500 bg-clip-text text-transparent">
              Officer Dashboard
            </h1>
            <p className="text-white/70 text-lg">Welcome, {user.name}</p>
          </div>
          <div className="flex items-center gap-4">
            <div className="text-right">
              <div className="text-sm text-white/60">Status</div>
              <div className={`text-sm font-medium ${isOnline ? "text-green-400" : "text-yellow-400"}`}>
                {isOnline ? "Online" : "Offline"}
              </div>
            </div>
            <Button
              variant="ghost"
              onClick={onLogout}
              className="text-white/70 hover:text-white hover:bg-white/10 transition-all"
            >
              <LogOut className="w-4 h-4 mr-2" />
              Logout
            </Button>
          </div>
        </div>
      </motion.div>

      <div className="flex max-w-7xl mx-auto">
        {/* Sidebar */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.2 }}
          className="w-64 bg-slate-800/50 min-h-screen p-4"
        >
          <nav className="space-y-2">
            {[
              {
                id: "queries",
                icon: MessageSquare,
                label: "Incoming Queries",
                count: queries.filter((q) => q.status === "pending").length,
              },
              {
                id: "suggestions",
                icon: Clock,
                label: "AI Suggestions",
                count: queries.filter((q) => q.confidence < 70).length,
              },
              {
                id: "approved",
                icon: CheckCircle,
                label: "Approved Responses",
                count: queries.filter((q) => q.status === "approved").length,
              },
              { id: "analytics", icon: BarChart3, label: "Analytics", count: null },
              { id: "admin", icon: Users, label: "Admin Panel", count: null },
            ].map((item) => (
              <motion.button
                key={item.id}
                onClick={() => setActiveTab(item.id as any)}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className={`w-full flex items-center justify-between gap-3 px-4 py-3 rounded-lg text-left transition-all ${
                  activeTab === item.id
                    ? "bg-gradient-to-r from-green-400 to-lime-500 text-slate-900"
                    : "text-white/70 hover:text-white hover:bg-white/10"
                }`}
              >
                <div className="flex items-center gap-3">
                  <item.icon className="w-5 h-5" />
                  {item.label}
                </div>
                {item.count !== null && <Badge className="bg-white/20 text-white text-xs">{item.count}</Badge>}
              </motion.button>
            ))}
          </nav>
        </motion.div>

        {/* Main Content */}
        <div className="flex-1 p-6" ref={ref}>
          {/* Queries Tab */}
          {activeTab === "queries" && (
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="space-y-6">
              {/* Search and Filter */}
              <Card className="backdrop-blur-lg bg-white/10 border-white/20 p-4">
                <div className="flex flex-col sm:flex-row gap-4">
                  <div className="flex-1 relative">
                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-white/50 w-4 h-4" />
                    <Input
                      placeholder="Search queries or farmer names..."
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                      className="pl-10 bg-white/10 border-white/20 text-white placeholder:text-white/50"
                    />
                  </div>
                  <div className="flex gap-2">
                    <select
                      value={filterStatus}
                      onChange={(e) => setFilterStatus(e.target.value)}
                      className="px-3 py-2 rounded-md bg-white/10 border border-white/20 text-white"
                    >
                      <option value="all">All Status</option>
                      <option value="pending">Pending</option>
                      <option value="approved">Approved</option>
                      <option value="escalated">Escalated</option>
                      <option value="rejected">Rejected</option>
                    </select>
                  </div>
                </div>
              </Card>

              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                {/* Query List */}
                <div className="space-y-4">
                  <h2 className="text-xl font-semibold text-white mb-4">Query Management ({filteredQueries.length})</h2>

                  <div className="space-y-3 max-h-[600px] overflow-y-auto">
                    <AnimatePresence>
                      {filteredQueries.map((query, index) => (
                        <motion.div
                          key={query.id}
                          initial={{ opacity: 0, y: 20 }}
                          animate={{ opacity: 1, y: 0 }}
                          exit={{ opacity: 0, y: -20 }}
                          transition={{ delay: index * 0.1 }}
                          whileHover={{ scale: 1.02 }}
                        >
                          <Card
                            className={`backdrop-blur-lg bg-white/10 border-white/20 p-4 cursor-pointer transition-all ${
                              selectedQuery?.id === query.id ? "ring-2 ring-green-400" : ""
                            }`}
                            onClick={() => handleSelectQuery(query)}
                          >
                            <div className="space-y-3">
                              <div className="flex justify-between items-start">
                                <div>
                                  <h3 className="font-semibold text-white flex items-center gap-2">
                                    {getCategoryIcon(query.category)} {query.farmerName}
                                  </h3>
                                  <p className="text-white/60 text-sm">{query.farmerPhone}</p>
                                </div>
                                <div className="flex flex-col gap-1">
                                  <Badge className={`${getConfidenceColor(query.confidence)} text-white text-xs`}>
                                    {query.confidence}%
                                  </Badge>
                                  <Badge className={`${getPriorityColor(query.priority)} text-white text-xs`}>
                                    {query.priority}
                                  </Badge>
                                </div>
                              </div>

                              <p className="text-white/80 text-sm line-clamp-2">{query.query}</p>

                              <div className="flex justify-between items-center">
                                <div className="flex gap-2">
                                  <Badge className={`${getStatusColor(query.status)} text-white text-xs`}>
                                    {query.status}
                                  </Badge>
                                  <Badge className="bg-slate-600 text-white text-xs">{query.category}</Badge>
                                </div>
                                <div className="flex items-center gap-2">
                                  <span className="text-white/60 text-xs">{query.timestamp}</span>
                                  {query.confidence < 70 && <AlertTriangle className="w-4 h-4 text-yellow-400" />}
                                </div>
                              </div>
                            </div>
                          </Card>
                        </motion.div>
                      ))}
                    </AnimatePresence>
                  </div>
                </div>

                {/* Query Detail */}
                <AnimatePresence>
                  {selectedQuery && (
                    <motion.div
                      initial={{ opacity: 0, x: 20 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0, x: 20 }}
                      className="space-y-4"
                    >
                      <h2 className="text-xl font-semibold text-white">Query Details</h2>

                      <Card className="backdrop-blur-lg bg-white/10 border-white/20 p-6">
                        <div className="space-y-6">
                          <div>
                            <div className="flex justify-between items-start mb-3">
                              <h3 className="font-semibold text-white">Farmer Information:</h3>
                              <div className="flex gap-2">
                                <Badge className={`${getPriorityColor(selectedQuery.priority)} text-white`}>
                                  {selectedQuery.priority} priority
                                </Badge>
                                <Badge className="bg-slate-600 text-white">{selectedQuery.category}</Badge>
                              </div>
                            </div>
                            <div className="bg-slate-800/50 rounded-lg p-3 space-y-1">
                              <p className="text-white font-medium">{selectedQuery.farmerName}</p>
                              <p className="text-white/70 text-sm">{selectedQuery.farmerPhone}</p>
                              <p className="text-white/60 text-xs">{selectedQuery.timestamp}</p>
                            </div>
                          </div>

                          <div>
                            <h3 className="font-semibold text-white mb-2">Farmer Query:</h3>
                            <div className="bg-slate-800/50 rounded-lg p-4">
                              <p className="text-white/80 leading-relaxed">{selectedQuery.query}</p>
                            </div>
                          </div>

                          <div>
                            <div className="flex justify-between items-center mb-2">
                              <h3 className="font-semibold text-white">AI Response:</h3>
                              <div className="flex items-center gap-2">
                                <span className="text-sm text-white/60">Confidence:</span>
                                <Badge className={`${getConfidenceColor(selectedQuery.confidence)} text-white`}>
                                  {selectedQuery.confidence}%
                                </Badge>
                              </div>
                            </div>
                            <div className="bg-slate-800/50 rounded-lg p-4">
                              <p className="text-white/80 leading-relaxed">{selectedQuery.aiResponse}</p>
                            </div>
                          </div>

                          <div>
                            <h3 className="font-semibold text-white mb-2">Edit Response:</h3>
                            <Textarea
                              value={editedResponse}
                              onChange={(e) => setEditedResponse(e.target.value)}
                              className="bg-white/10 border-white/20 text-white placeholder:text-white/50 min-h-[120px]"
                              placeholder="Edit the AI response or write your own..."
                            />
                          </div>

                          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                            <Button
                              onClick={handleApprove}
                              className="bg-gradient-to-r from-green-400 to-lime-500 text-slate-900 hover:from-green-500 hover:to-lime-600"
                            >
                              <CheckCircle className="w-4 h-4 mr-2" />
                              Approve
                            </Button>

                            <Button
                              onClick={handleSendEdited}
                              className="bg-gradient-to-r from-blue-400 to-cyan-500 text-slate-900 hover:from-blue-500 hover:to-cyan-600"
                            >
                              <Send className="w-4 h-4 mr-2" />
                              Send Edited
                            </Button>

                            <Button
                              onClick={handleReject}
                              variant="destructive"
                              className="bg-gradient-to-r from-red-400 to-red-500 hover:from-red-500 hover:to-red-600"
                            >
                              <Trash2 className="w-4 h-4 mr-2" />
                              Reject
                            </Button>
                          </div>
                        </div>
                      </Card>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            </motion.div>
          )}

          {/* Analytics Tab */}
          {activeTab === "analytics" && (
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="space-y-6">
              <h2 className="text-2xl font-semibold text-white">Analytics Dashboard</h2>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <Card className="backdrop-blur-lg bg-white/10 border-white/20 p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-white/70 text-sm">Total Queries</p>
                      <p className="text-3xl font-bold text-white">{queries.length}</p>
                    </div>
                    <div className="p-3 rounded-full bg-gradient-to-r from-green-400 to-lime-500">
                      <MessageSquare className="w-6 h-6 text-slate-900" />
                    </div>
                  </div>
                </Card>

                <Card className="backdrop-blur-lg bg-white/10 border-white/20 p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-white/70 text-sm">Pending Review</p>
                      <p className="text-3xl font-bold text-white">
                        {queries.filter((q) => q.status === "pending").length}
                      </p>
                    </div>
                    <div className="p-3 rounded-full bg-gradient-to-r from-yellow-400 to-orange-500">
                      <Clock className="w-6 h-6 text-slate-900" />
                    </div>
                  </div>
                </Card>

                <Card className="backdrop-blur-lg bg-white/10 border-white/20 p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-white/70 text-sm">Avg Confidence</p>
                      <p className="text-3xl font-bold text-white">
                        {Math.round(queries.reduce((acc, q) => acc + q.confidence, 0) / queries.length)}%
                      </p>
                    </div>
                    <div className="p-3 rounded-full bg-gradient-to-r from-blue-400 to-cyan-500">
                      <TrendingUp className="w-6 h-6 text-slate-900" />
                    </div>
                  </div>
                </Card>
              </div>

              <Card className="backdrop-blur-lg bg-white/10 border-white/20 p-6">
                <h3 className="text-lg font-semibold text-white mb-4">Query Categories</h3>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                  {["disease", "pest", "fertilizer", "general"].map((category) => {
                    const count = queries.filter((q) => q.category === category).length
                    return (
                      <div key={category} className="text-center">
                        <div className="text-2xl mb-2">{getCategoryIcon(category)}</div>
                        <p className="text-white font-medium capitalize">{category}</p>
                        <p className="text-white/70 text-sm">{count} queries</p>
                      </div>
                    )
                  })}
                </div>
              </Card>
            </motion.div>
          )}

          {/* Admin Panel */}
          {activeTab === "admin" && (
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="space-y-6">
              <h2 className="text-2xl font-semibold text-white">Admin Panel</h2>

              {/* Add New Officer */}
              <Card className="backdrop-blur-lg bg-white/10 border-white/20 p-6">
                <h3 className="text-lg font-semibold text-white mb-4">Add New Officer</h3>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
                  <Input
                    placeholder="Officer Name"
                    value={newOfficer.name}
                    onChange={(e) => setNewOfficer({ ...newOfficer, name: e.target.value })}
                    className="bg-white/10 border-white/20 text-white placeholder:text-white/50"
                  />
                  <Input
                    placeholder="Email Address"
                    type="email"
                    value={newOfficer.email}
                    onChange={(e) => setNewOfficer({ ...newOfficer, email: e.target.value })}
                    className="bg-white/10 border-white/20 text-white placeholder:text-white/50"
                  />
                  <Input
                    placeholder="Department"
                    value={newOfficer.department}
                    onChange={(e) => setNewOfficer({ ...newOfficer, department: e.target.value })}
                    className="bg-white/10 border-white/20 text-white placeholder:text-white/50"
                  />
                </div>
                <Button
                  onClick={handleAddOfficer}
                  className="bg-gradient-to-r from-green-400 to-lime-500 text-slate-900 hover:from-green-500 hover:to-lime-600"
                >
                  <Plus className="w-4 h-4 mr-2" />
                  Add Officer
                </Button>
              </Card>

              {/* Officers List */}
              <Card className="backdrop-blur-lg bg-white/10 border-white/20 p-6">
                <h3 className="text-lg font-semibold text-white mb-4">Current Officers</h3>
                <div className="space-y-3">
                  {officers.map((officer) => (
                    <div key={officer.id} className="flex items-center justify-between p-4 bg-slate-800/50 rounded-lg">
                      <div>
                        <h4 className="font-medium text-white">{officer.name}</h4>
                        <p className="text-white/70 text-sm">{officer.email}</p>
                        <p className="text-white/60 text-xs">{officer.department}</p>
                      </div>
                      <div className="text-right">
                        <Badge className={officer.status === "active" ? "bg-green-500" : "bg-gray-500"}>
                          {officer.status}
                        </Badge>
                        <p className="text-white/70 text-sm mt-1">{officer.queriesHandled} queries handled</p>
                      </div>
                    </div>
                  ))}
                </div>
              </Card>
            </motion.div>
          )}
        </div>
      </div>
    </div>
  )
}
