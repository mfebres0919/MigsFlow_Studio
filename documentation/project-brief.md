# MigsFlow Studio — Self-Service Website Platform

*Project brief written by Miguelle, saved here on 2026-11-21 exactly as given. Decisions made after it (including where the project departs from this brief or from the handbook) are recorded in the root `CLAUDE.md`.*

## Project Overview

I own a web design and development company called MigsFlow. Currently, my team and I build custom websites using HTML, CSS and JavaScript, manage our repositories through GitHub, and host websites through Netlify.

I want to explore creating a separate digital product platform, tentatively called **MigsFlow Studio**, where small business owners can purchase professionally designed website templates, customize them independently, and eventually publish their own websites without needing coding experience.

The goal is to establish a scalable revenue stream that requires minimal manual involvement from my team.

This is currently an experimental project. I want to build it incrementally rather than immediately develop a complete production-ready platform.

## Initial Target Industries

The first three industries the platform will cater to are:

### 1. Cleaning Companies

- Residential and commercial cleaning
- Service listings
- Before-and-after galleries
- Testimonials
- Quote request forms

### 2. Nonprofit Organizations

- Mission and vision
- Programs and initiatives
- Donation links
- Volunteer opportunities
- Community impact

### 3. Moving & Logistics Companies

- Residential and commercial moving
- Transportation services
- Service areas
- Quote request forms
- Customer testimonials

Each industry will eventually have multiple website template options.

## Technology Stack

- Next.js with App Router
- TypeScript
- Tailwind CSS
- Supabase for future authentication, database and file storage
- Stripe for future payment processing
- Netlify API for future website deployments
- GitHub for version control

Use reusable components, modular architecture and a scalable folder structure.

## Customer Journey

The eventual customer experience should work as follows:

1. Customer visits the MigsFlow template marketplace.
2. Customer browses templates by industry.
3. Customer previews a template.
4. Customer purchases the template and creates an account.
5. The template is added to their personal dashboard.
6. Customer customizes their website using the CMS editor.
7. Customer previews and saves their changes.
8. Customer connects a custom domain.
9. Customer publishes their website.
10. Customer can return to their dashboard to make future updates.

## Platform Pages

### Public-Facing Pages

- Landing page
- Template marketplace
- Industry category pages
- Individual template details
- Full website template preview
- Pricing
- Login
- Create account

### Customer Dashboard

The customer dashboard should include the following pages:

**Overview**

- Welcome message
- Website overview
- Website status
- Quick actions
- Recent activity

**My Websites**

- Purchased templates
- Website thumbnails
- Draft or published status
- Edit website
- Preview website

**Website Editor**

- Page selector
- Editable content fields
- Live website preview
- Desktop, tablet and mobile preview modes
- Save draft
- Publish button

**Media Library**

- Upload images
- Upload logos
- Manage existing assets
- Delete and replace files

**Domains**

- Current website domain
- Default website subdomain
- Add custom domain
- DNS configuration instructions
- Domain verification status

**Hosting & Publishing**

- Website publication status
- Hosting information
- Last published date
- Deployment history

**Billing**

- Purchased templates
- Subscription information
- Payment history
- Invoice history

**Account Settings**

- Personal information
- Business information
- Account security
- Logout

## Website CMS Editor

The editor is the most important part of this platform.

I do not want to build a complicated drag-and-drop website builder initially. Instead, customers should be able to personalize predefined website layouts through structured editing fields.

Editable fields should include:

- Business name
- Logo
- Headings
- Paragraphs
- Images
- Brand colors
- Fonts
- Button text and links
- Services
- Testimonials
- Contact information
- Business hours
- Social media links
- SEO titles and descriptions

The editor should use a split-screen layout, with editing controls on one side and a live website preview on the other.

Changes should immediately appear in the preview without modifying the published website until the customer chooses to publish.

Each template should have a defined content schema that determines which fields are editable. The template's underlying design and layout should remain protected.

Create a reusable editing system rather than building a completely different editor for each template.

## Future Backend Architecture

Supabase will eventually handle:

- Passwordless customer authentication
- Customer profiles
- Website ownership
- Template purchases
- Website content
- Draft and published versions
- Uploaded media
- Domain configurations

Each customer must only be able to access their own websites. Implement appropriate server-side authorization, database Row Level Security policies and storage access policies.

Customers should not need to share their passwords with MigsFlow.

## Future Hosting and Domain Management

Customers should eventually receive a default website subdomain and have the option to connect their own custom domain.

The proposed publishing workflow is:

1. Customer clicks Publish.
2. The backend retrieves their saved website content.
3. The appropriate template is rendered into production-ready website files.
4. The website is deployed through the hosting provider's API.
5. Deployment status is returned to the dashboard.

For custom domains, customers should receive the DNS records they need to configure through their existing domain registrar.

The platform should verify domain ownership, check DNS configuration and display SSL and connection status.

I do not want to build a complete DNS management system or domain registrar.

Netlify is the initial hosting provider under consideration. Confirm its API capabilities, commercial usage limits and scalability before implementing production hosting.

## Design Direction

The application should feel like a premium, modern SaaS platform consistent with the MigsFlow brand.

- Dark navy and black backgrounds
- Blue accent colors
- Clean typography
- Minimalist interface
- Professional sidebar navigation
- Modern cards and subtle animations
- Fully responsive across devices
- Accessible and easy to navigate
- Beginner-friendly for nontechnical business owners

The interface should feel custom-built rather than like a generic admin dashboard template.

## Development Roadmap

### Phase 1 — Dashboard Prototype (Current Priority)

- Initialize the Next.js application.
- Establish the folder structure and reusable components.
- Create the shared dashboard layout.
- Build all customer dashboard pages.
- Use realistic mock customer data.
- Create a functional website editor prototype.
- Build one sample cleaning company template.
- Demonstrate live editing and responsive previews.
- Allow mock draft changes to persist locally.

Do not integrate real authentication, payments, hosting or domain services yet.

### Phase 2 — Template Marketplace

- Build the public marketplace.
- Create industry filtering.
- Build individual template pages.
- Add full website previews.
- Create nonprofit and moving/logistics templates.
- Establish a consistent template content schema.

### Phase 3 — Supabase Integration

- Configure authentication.
- Create database tables.
- Implement customer accounts.
- Connect the website editor to the database.
- Implement image and logo uploads.
- Configure security and ownership policies.
- Replace mock data with real customer data.

### Phase 4 — Payments

- Integrate Stripe.
- Implement template purchases.
- Automatically grant template access after verified payment.
- Implement optional hosting subscriptions.
- Build billing management.

### Phase 5 — Hosting & Publishing

- Implement automated website generation.
- Integrate hosting provider APIs.
- Create website publishing functionality.
- Implement custom domain connections.
- Handle deployment errors and SSL verification.

### Phase 6 — Administration & Production Readiness

- Create a MigsFlow administrator dashboard.
- Manage templates and customers.
- Monitor deployments and subscriptions.
- Implement backups, testing, security and error monitoring.
- Prepare for production launch.

## Business Model

Potential revenue streams include:

- One-time digital template purchases starting around $15–$20.
- Website customization add-ons.
- Premium template collections.
- Upgrades to MigsFlow's fully custom web design services.

Pricing is exploratory and should not be hardcoded into the application architecture.

## Instructions for Development

Start with Phase 1 only.

Before writing code:

1. Explain the proposed application architecture.
2. Show the recommended folder structure.
3. Identify reusable components.
4. Explain how the template editing system will work.
5. Break Phase 1 into manageable development milestones.

I am learning Next.js and JavaScript, so explain important technical decisions in plain English throughout development.

Do not implement future integrations prematurely. Use mock data and clearly identify simulated functionality.

The immediate goal is to create a polished, functional prototype of the MigsFlow customer dashboard and website editing experience.
