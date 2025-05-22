import { google } from 'googleapis';

export interface CalendarEvent {
  title: string;
  startTime: string;
  endTime: string;
  attendeeEmail: string;
  description?: string;
  meetingLink?: string;
}

export class GoogleCalendarService {
  private calendar: any;
  
  constructor(accessToken: string) {
    const auth = new google.auth.OAuth2(
      process.env.GOOGLE_CLIENT_ID,
      process.env.GOOGLE_CLIENT_SECRET
    );
    
    auth.setCredentials({ access_token: accessToken });
    this.calendar = google.calendar({ version: 'v3', auth });
  }

  async createMeetingEvent(event: CalendarEvent): Promise<string> {
    try {
      const calendarEvent = {
        summary: event.title,
        start: {
          dateTime: event.startTime,
          timeZone: 'America/New_York',
        },
        end: {
          dateTime: event.endTime,
          timeZone: 'America/New_York',
        },
        attendees: [
          { email: event.attendeeEmail }
        ],
        description: event.description || '',
        location: event.meetingLink || '',
        conferenceData: event.meetingLink ? {
          conferenceSolution: {
            key: { type: 'hangoutsMeet' }
          },
          createRequest: {
            requestId: `meet-${Date.now()}`,
            conferenceSolutionKey: { type: 'hangoutsMeet' }
          }
        } : undefined
      };

      const response = await this.calendar.events.insert({
        calendarId: 'primary',
        resource: calendarEvent,
        conferenceDataVersion: 1,
        sendUpdates: 'all'
      });

      return response.data.id;
    } catch (error) {
      console.error('Error creating calendar event:', error);
      throw new Error('Failed to create calendar event');
    }
  }

  async updateMeetingEvent(eventId: string, event: Partial<CalendarEvent>): Promise<void> {
    try {
      const updateData: any = {};
      
      if (event.title) updateData.summary = event.title;
      if (event.startTime) {
        updateData.start = {
          dateTime: event.startTime,
          timeZone: 'America/New_York'
        };
      }
      if (event.endTime) {
        updateData.end = {
          dateTime: event.endTime,
          timeZone: 'America/New_York'
        };
      }
      if (event.description) updateData.description = event.description;
      if (event.meetingLink) updateData.location = event.meetingLink;

      await this.calendar.events.update({
        calendarId: 'primary',
        eventId: eventId,
        resource: updateData,
        sendUpdates: 'all'
      });
    } catch (error) {
      console.error('Error updating calendar event:', error);
      throw new Error('Failed to update calendar event');
    }
  }

  async deleteMeetingEvent(eventId: string): Promise<void> {
    try {
      await this.calendar.events.delete({
        calendarId: 'primary',
        eventId: eventId,
        sendUpdates: 'all'
      });
    } catch (error) {
      console.error('Error deleting calendar event:', error);
      throw new Error('Failed to delete calendar event');
    }
  }
}

// Industry-specific field configurations
export const industryFieldConfigs = {
  ecommerce: [
    { name: 'platform', label: 'E-commerce Platform', type: 'select', options: ['Shopify', 'WooCommerce', 'Magento', 'BigCommerce', 'Custom'] },
    { name: 'monthlyRevenue', label: 'Monthly Revenue', type: 'number' },
    { name: 'productCount', label: 'Number of Products', type: 'number' },
    { name: 'averageOrderValue', label: 'Average Order Value', type: 'number' }
  ],
  saas: [
    { name: 'userCount', label: 'Active Users', type: 'number' },
    { name: 'mrr', label: 'Monthly Recurring Revenue', type: 'number' },
    { name: 'churnRate', label: 'Churn Rate (%)', type: 'number' },
    { name: 'pricingModel', label: 'Pricing Model', type: 'select', options: ['Freemium', 'Subscription', 'One-time', 'Usage-based'] }
  ],
  healthcare: [
    { name: 'facilityType', label: 'Facility Type', type: 'select', options: ['Hospital', 'Clinic', 'Private Practice', 'Dental', 'Mental Health'] },
    { name: 'patientCount', label: 'Patient Count', type: 'number' },
    { name: 'specialization', label: 'Specialization', type: 'text' },
    { name: 'complianceNeeds', label: 'Compliance Requirements', type: 'text' }
  ],
  finance: [
    { name: 'serviceType', label: 'Service Type', type: 'select', options: ['Banking', 'Insurance', 'Investment', 'Fintech', 'Accounting'] },
    { name: 'aum', label: 'Assets Under Management', type: 'number' },
    { name: 'clientBase', label: 'Client Base Size', type: 'number' },
    { name: 'regulations', label: 'Key Regulations', type: 'text' }
  ],
  education: [
    { name: 'institutionType', label: 'Institution Type', type: 'select', options: ['K-12', 'University', 'Community College', 'Online', 'Training'] },
    { name: 'studentCount', label: 'Student Count', type: 'number' },
    { name: 'programs', label: 'Key Programs', type: 'text' },
    { name: 'accreditation', label: 'Accreditation Status', type: 'text' }
  ],
  real_estate: [
    { name: 'propertyType', label: 'Property Type', type: 'select', options: ['Residential', 'Commercial', 'Industrial', 'Mixed-use'] },
    { name: 'portfolioSize', label: 'Portfolio Size', type: 'number' },
    { name: 'avgPropertyValue', label: 'Average Property Value', type: 'number' },
    { name: 'marketFocus', label: 'Market Focus', type: 'text' }
  ],
  manufacturing: [
    { name: 'industrySegment', label: 'Industry Segment', type: 'text' },
    { name: 'employeeCount', label: 'Employee Count', type: 'number' },
    { name: 'annualRevenue', label: 'Annual Revenue', type: 'number' },
    { name: 'productLines', label: 'Product Lines', type: 'text' }
  ],
  consulting: [
    { name: 'specialization', label: 'Specialization', type: 'text' },
    { name: 'teamSize', label: 'Team Size', type: 'number' },
    { name: 'clientIndustries', label: 'Client Industries', type: 'text' },
    { name: 'projectTypes', label: 'Typical Project Types', type: 'text' }
  ],
  agency: [
    { name: 'agencyType', label: 'Agency Type', type: 'select', options: ['Marketing', 'Creative', 'Digital', 'PR', 'Full-service'] },
    { name: 'clientCount', label: 'Active Clients', type: 'number' },
    { name: 'teamSize', label: 'Team Size', type: 'number' },
    { name: 'specialties', label: 'Specialties', type: 'text' }
  ],
  other: []
};