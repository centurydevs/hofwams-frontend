export type EventRequest = {
  id: string
  name: string
  email: string
  eventType: string
  date: string
  status: 'pending' | 'accepted' | 'rejected'
}

export type DashboardStats = {
  totalCustomers: number
  totalEvents: number
}

export type NavItem = {
  title: string
  icon: React.ComponentType
  href: string
}

