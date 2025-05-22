import { db } from "./db";
import { 
  users, clients, projects, tasks, invoices, payments, content, 
  onboardingFlows, offboardingFlows, feedback, salesLeads, salesActivities
} from "@shared/schema";

export async function seedDemoData() {
  console.log("🌱 Seeding demo data...");

  try {
    // Create additional users for the agency team
    const demoUsers = await db.insert(users).values([
      {
        username: "sarah_sales",
        email: "sarah@tektus.com", 
        password: "$2b$10$hash", // placeholder hash
        firstName: "Sarah",
        lastName: "Martinez",
        role: "sales"
      },
      {
        username: "mike_traffic",
        email: "mike@tektus.com",
        password: "$2b$10$hash",
        firstName: "Mike",
        lastName: "Chen",
        role: "traffic"
      },
      {
        username: "emma_content",
        email: "emma@tektus.com", 
        password: "$2b$10$hash",
        firstName: "Emma",
        lastName: "Silva",
        role: "content"
      },
      {
        username: "alex_finance",
        email: "alex@tektus.com",
        password: "$2b$10$hash", 
        firstName: "Alex",
        lastName: "Johnson",
        role: "finance"
      }
    ]).returning();

    // Create diverse clients across different industries
    const demoClients = await db.insert(clients).values([
      {
        name: "TechFlow Solutions",
        email: "contact@techflow.com",
        phone: "+1 (555) 123-4567",
        company: "TechFlow Solutions",
        industry: "SaaS",
        status: "active",
        healthScore: "healthy",
        monthlyValue: "8500.00",
        assignedUserId: 1,
        notes: "Growing SaaS company focused on project management tools"
      },
      {
        name: "GreenLeaf Organics",
        email: "hello@greenleaf.com", 
        phone: "+1 (555) 234-5678",
        company: "GreenLeaf Organics",
        industry: "E-commerce",
        status: "active", 
        healthScore: "healthy",
        monthlyValue: "12000.00",
        assignedUserId: 2,
        notes: "Organic food e-commerce with strong growth trajectory"
      },
      {
        name: "EduBright Academy",
        email: "admin@edubright.edu",
        phone: "+1 (555) 345-6789", 
        company: "EduBright Academy",
        industry: "Education",
        status: "active",
        healthScore: "at_risk",
        monthlyValue: "6500.00",
        assignedUserId: 1,
        notes: "Online education platform, concerned about student retention"
      },
      {
        name: "HealthFirst Clinic",
        email: "info@healthfirst.com",
        phone: "+1 (555) 456-7890",
        company: "HealthFirst Clinic",
        industry: "Healthcare", 
        status: "active",
        healthScore: "healthy",
        monthlyValue: "9200.00",
        assignedUserId: 3,
        notes: "Multi-location healthcare clinic expanding digital presence"
      },
      {
        name: "FinanceFlow Inc",
        email: "contact@financeflow.com",
        phone: "+1 (555) 567-8901",
        company: "FinanceFlow Inc",
        industry: "Finance",
        status: "onboarding",
        healthScore: "healthy", 
        monthlyValue: "15000.00",
        assignedUserId: 1,
        notes: "Fintech startup launching new mobile banking app"
      },
      {
        name: "PropertyPro Realty",
        email: "team@propertypro.com",
        phone: "+1 (555) 678-9012",
        company: "PropertyPro Realty",
        industry: "Real Estate",
        status: "active",
        healthScore: "critical",
        monthlyValue: "7800.00", 
        assignedUserId: 2,
        notes: "Real estate agency struggling with lead generation"
      },
      {
        name: "ManufactureTech Co",
        email: "sales@manufacturetek.com",
        phone: "+1 (555) 789-0123",
        company: "ManufactureTech Co", 
        industry: "Manufacturing",
        status: "active",
        healthScore: "healthy",
        monthlyValue: "11500.00",
        assignedUserId: 3,
        notes: "Industrial equipment manufacturer entering B2B digital marketing"
      },
      {
        name: "ConsultPro Partners",
        email: "hello@consultpro.com",
        phone: "+1 (555) 890-1234",
        company: "ConsultPro Partners",
        industry: "Consulting",
        status: "active",
        healthScore: "at_risk",
        monthlyValue: "5500.00",
        assignedUserId: 1,
        notes: "Management consulting firm needing thought leadership strategy"
      },
      {
        name: "CreativeHub Agency",
        email: "info@creativehub.com", 
        phone: "+1 (555) 901-2345",
        company: "CreativeHub Agency",
        industry: "Agency",
        status: "offboarding",
        healthScore: "critical",
        monthlyValue: "4200.00",
        assignedUserId: 2,
        notes: "Creative agency ending contract due to budget constraints"
      },
      {
        name: "LocalBiz Solutions",
        email: "contact@localbiz.com",
        phone: "+1 (555) 012-3456",
        company: "LocalBiz Solutions",
        industry: "Other",
        status: "active",
        healthScore: "healthy",
        monthlyValue: "3800.00",
        assignedUserId: 3,
        notes: "Local business directory and marketing platform"
      }
    ]).returning();

    // Create sales leads in various stages
    const demoLeads = await db.insert(salesLeads).values([
      {
        companyName: "NextGen Startups",
        contactName: "Jessica Williams",
        email: "jessica@nextgen.com", 
        phone: "+1 (555) 111-2222",
        position: "CEO",
        stage: "new_lead",
        source: "website",
        industry: "saas",
        dealValue: "18000.00",
        probability: 20,
        assignedUserId: 2,
        notes: "Interested in complete digital marketing overhaul",
        industryFields: JSON.stringify({
          userCount: 15000,
          mrr: 45000,
          pricingModel: "Subscription"
        })
      },
      {
        companyName: "ShopSmart E-commerce",
        contactName: "David Rodriguez", 
        email: "david@shopsmart.com",
        phone: "+1 (555) 222-3333",
        position: "Marketing Director",
        stage: "contact_made",
        source: "referral",
        industry: "ecommerce",
        dealValue: "25000.00",
        probability: 40,
        assignedUserId: 2,
        notes: "Referred by GreenLeaf Organics, needs social media strategy",
        industryFields: JSON.stringify({
          platform: "Shopify",
          monthlyRevenue: 180000,
          productCount: 450
        })
      },
      {
        companyName: "WellnessPro Clinic",
        contactName: "Dr. Maria Santos",
        email: "maria@wellnesspro.com",
        phone: "+1 (555) 333-4444", 
        position: "Chief Medical Officer",
        stage: "meeting_scheduled",
        source: "networking",
        industry: "healthcare",
        dealValue: "12000.00",
        probability: 60,
        assignedUserId: 1,
        notes: "Meeting scheduled for next Tuesday to discuss patient acquisition",
        meetingDate: new Date("2025-05-25T14:00:00Z"),
        industryFields: JSON.stringify({
          facilityType: "Clinic",
          patientCount: 2500,
          specialization: "Preventive Care"
        })
      },
      {
        companyName: "CryptoVault Finance",
        contactName: "Robert Kim",
        email: "robert@cryptovault.com",
        phone: "+1 (555) 444-5555",
        position: "Head of Marketing",
        stage: "proposal_sent", 
        source: "advertising",
        industry: "finance",
        dealValue: "35000.00",
        probability: 75,
        assignedUserId: 2,
        notes: "Proposal sent for comprehensive fintech marketing campaign",
        industryFields: JSON.stringify({
          serviceType: "Fintech",
          clientBase: 50000,
          regulations: "SEC, FINRA compliance required"
        })
      },
      {
        companyName: "LearnFast University",
        contactName: "Prof. Jennifer Adams",
        email: "jadams@learnfast.edu",
        phone: "+1 (555) 555-6666",
        position: "Dean of Marketing",
        stage: "negotiation",
        source: "email_marketing",
        industry: "education", 
        dealValue: "22000.00",
        probability: 85,
        assignedUserId: 1,
        notes: "In final negotiations for student recruitment campaign",
        industryFields: JSON.stringify({
          institutionType: "University",
          studentCount: 12000,
          programs: "Business, Technology, Healthcare"
        })
      },
      {
        companyName: "BuildRight Construction",
        contactName: "Tom Anderson",
        email: "tom@buildright.com",
        phone: "+1 (555) 666-7777",
        position: "Owner",
        stage: "won",
        source: "referral",
        industry: "other",
        dealValue: "8500.00",
        probability: 100,
        assignedUserId: 3,
        notes: "Contract signed! Starting next month with local SEO focus",
        actualCloseDate: new Date("2025-05-20T00:00:00Z")
      },
      {
        companyName: "FoodieBox Delivery",
        contactName: "Lisa Chang",
        email: "lisa@foodiebox.com", 
        phone: "+1 (555) 777-8888",
        position: "Marketing Manager",
        stage: "lost",
        source: "social_media",
        industry: "ecommerce",
        dealValue: "15000.00", 
        probability: 0,
        assignedUserId: 2,
        notes: "Lost to competitor due to pricing concerns",
        lostReason: "Budget constraints - chose lower-cost competitor",
        actualCloseDate: new Date("2025-05-18T00:00:00Z")
      }
    ]).returning();

    // Create projects for existing clients
    const demoProjects = await db.insert(projects).values([
      {
        name: "TechFlow Brand Redesign",
        description: "Complete rebrand including logo, website, and marketing materials",
        clientId: demoClients[0].id,
        managerId: 1,
        status: "in_progress",
        priority: "high",
        budget: "25000.00",
        startDate: new Date("2025-05-01T00:00:00Z"),
        deadline: new Date("2025-07-15T00:00:00Z")
      },
      {
        name: "GreenLeaf SEO Campaign", 
        description: "Comprehensive SEO strategy and content marketing",
        clientId: demoClients[1].id,
        managerId: 2,
        status: "in_progress",
        priority: "medium",
        budget: "18000.00",
        startDate: new Date("2025-04-15T00:00:00Z"),
        deadline: new Date("2025-08-30T00:00:00Z")
      },
      {
        name: "HealthFirst Social Media",
        description: "Social media management and patient education content",
        clientId: demoClients[3].id,
        managerId: 3, 
        status: "completed",
        priority: "medium",
        budget: "12000.00",
        startDate: new Date("2025-03-01T00:00:00Z"),
        deadline: new Date("2025-05-01T00:00:00Z"),
        completedAt: new Date("2025-04-28T00:00:00Z")
      }
    ]).returning();

    // Create diverse tasks across departments
    const demoTasks = await db.insert(tasks).values([
      {
        title: "Design new logo concepts for TechFlow",
        description: "Create 3 initial logo concepts following brand guidelines",
        clientId: demoClients[0].id,
        projectId: demoProjects[0].id,
        assigneeId: 3,
        creatorId: 1,
        status: "in_progress",
        priority: "high",
        dueDate: new Date("2025-05-28T00:00:00Z")
      },
      {
        title: "Set up Google Ads campaign for GreenLeaf",
        description: "Launch targeted Google Ads for organic food keywords",
        clientId: demoClients[1].id, 
        projectId: demoProjects[1].id,
        assigneeId: 2,
        creatorId: 1,
        status: "pending",
        priority: "high",
        dueDate: new Date("2025-05-30T00:00:00Z")
      },
      {
        title: "Create Instagram content calendar",
        description: "Plan 30 days of Instagram posts for HealthFirst",
        clientId: demoClients[3].id,
        projectId: demoProjects[2].id,
        assigneeId: 3,
        creatorId: 2,
        status: "completed",
        priority: "medium",
        dueDate: new Date("2025-05-20T00:00:00Z"),
        completedAt: new Date("2025-05-18T00:00:00Z")
      },
      {
        title: "Monthly financial report preparation",
        description: "Compile Q2 financial reports for all active clients",
        assigneeId: 4,
        creatorId: 1,
        status: "in_progress", 
        priority: "medium",
        dueDate: new Date("2025-05-31T00:00:00Z")
      },
      {
        title: "Client onboarding call - FinanceFlow",
        description: "Conduct discovery call and set project expectations",
        clientId: demoClients[4].id,
        assigneeId: 1,
        creatorId: 1,
        status: "pending",
        priority: "urgent",
        dueDate: new Date("2025-05-25T00:00:00Z")
      }
    ]).returning();

    // Create content calendar entries
    const demoContent = await db.insert(content).values([
      {
        title: "How to Choose Organic Foods - Blog Post",
        description: "Educational blog post about selecting organic products",
        clientId: demoClients[1].id,
        platform: "Blog",
        type: "blog_post",
        status: "published",
        publishedDate: new Date("2025-05-20T00:00:00Z"),
        authorId: 3
      },
      {
        title: "TechFlow Product Demo Video",
        description: "60-second product demonstration for social media",
        clientId: demoClients[0].id,
        platform: "Instagram",
        type: "video",
        status: "review",
        scheduledDate: new Date("2025-05-26T00:00:00Z"),
        authorId: 3
      },
      {
        title: "Healthcare Tips - LinkedIn Carousel",
        description: "5-slide carousel about preventive healthcare",
        clientId: demoClients[3].id,
        platform: "LinkedIn", 
        type: "carousel",
        status: "approved",
        scheduledDate: new Date("2025-05-24T00:00:00Z"),
        authorId: 3
      }
    ]).returning();

    // Create invoices and payments
    const demoInvoices = await db.insert(invoices).values([
      {
        clientId: demoClients[0].id,
        invoiceNumber: "INV-2025-001",
        total: "8500.00",
        status: "paid",
        issuedDate: new Date("2025-05-01T00:00:00Z"),
        dueDate: new Date("2025-05-31T00:00:00Z"),
        paidDate: new Date("2025-05-15T00:00:00Z"),
        description: "Monthly retainer - May 2025"
      },
      {
        clientId: demoClients[1].id,
        invoiceNumber: "INV-2025-002", 
        total: "12000.00",
        status: "paid",
        issuedDate: new Date("2025-05-01T00:00:00Z"),
        dueDate: new Date("2025-05-31T00:00:00Z"),
        paidDate: new Date("2025-05-12T00:00:00Z"),
        description: "Monthly retainer - May 2025"
      },
      {
        clientId: demoClients[2].id,
        invoiceNumber: "INV-2025-003",
        total: "6500.00", 
        status: "overdue",
        issuedDate: new Date("2025-04-01T00:00:00Z"),
        dueDate: new Date("2025-04-30T00:00:00Z"),
        description: "Monthly retainer - April 2025"
      },
      {
        clientId: demoClients[4].id,
        invoiceNumber: "INV-2025-004",
        total: "15000.00",
        status: "sent",
        issuedDate: new Date("2025-05-15T00:00:00Z"),
        dueDate: new Date("2025-06-15T00:00:00Z"), 
        description: "Onboarding package - FinanceFlow Inc"
      }
    ]).returning();

    // Create payments for paid invoices
    await db.insert(payments).values([
      {
        invoiceId: demoInvoices[0].id,
        amount: "8500.00",
        status: "completed",
        paymentDate: new Date("2025-05-15T00:00:00Z"),
        paymentMethod: "bank_transfer"
      },
      {
        invoiceId: demoInvoices[1].id,
        amount: "12000.00",
        status: "completed", 
        paymentDate: new Date("2025-05-12T00:00:00Z"),
        paymentMethod: "credit_card"
      }
    ]);

    console.log("✅ Demo data seeded successfully!");
    console.log(`Created: ${demoUsers.length} users, ${demoClients.length} clients, ${demoLeads.length} leads, ${demoProjects.length} projects, ${demoTasks.length} tasks`);

  } catch (error) {
    console.error("❌ Error seeding demo data:", error);
    throw error;
  }
}