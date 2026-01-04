# jigawa State Ministry of Justice Digital Portal

[![Next.js](https://img.shields.io/badge/Next.js-15.5.2-black)](https://nextjs.org/)
[![React](https://img.shields.io/badge/React-19.1.1-blue)](https://reactjs.org/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.0-blue)](https://www.typescriptlang.org/)
[![Prisma](https://img.shields.io/badge/Prisma-5.14-green)](https://prisma.io/)
[![PostgreSQL](https://img.shields.io/badge/PostgreSQL-15-blue)](https://postgresql.org/)
[![TailwindCSS](https://img.shields.io/badge/TailwindCSS-3.4-blue)](https://tailwindcss.com/)

## 🌟 Overview

The **jigawa State Ministry of Justice Digital Portal** is a comprehensive, enterprise-grade web application designed to digitize and modernize judicial processes in jigawa State, Nigeria. This platform transforms traditional paper-based justice systems into efficient, transparent, and accessible digital workflows, serving citizens, law enforcement, judicial officers, and ministry administrators.

## 🎯 Key Features

### 🔐 **Multi-Role Authentication System**
- **5 Distinct User Roles**: Citizens, Police, Courts, Staff, and Ministry Administrators
- **OAuth Integration**: Google and GitHub authentication
- **Two-Factor Authentication**: Enhanced security for sensitive operations
- **Role-Based Access Control**: Granular permissions and route protection
- **Session Management**: Secure JWT-based authentication with NextAuth.js

### 👥 **User Management & Profiles**
- **Citizen Portal**: Public registration and profile management
- **Law Enforcement Profiles**: Police station management and officer profiles
- **Judicial Profiles**: Court officials and tribunal assignments
- **Staff Management**: Judiciary personnel tracking and performance monitoring
- **Admin Oversight**: System-wide user administration

### 📋 **Case Management System**
- **Multi-Tribunal Support**: Sharia, Civil, Election, Industrial, Tax, and Administrative courts
- **Case Lifecycle Tracking**: From filing to resolution with status updates
- **Document Management**: Secure file uploads and evidence handling
- **Case Assignment**: Automated and manual case distribution
- **Hearing Management**: Court date scheduling and tracking

### 👮 **Police Operations**
- **First Information Reports (FIR)**: Digital FIR creation and submission
- **Case Drafting**: Save work-in-progress reports
- **Evidence Upload**: Photos, statements, and medical reports
- **Defendant Management**: Comprehensive defendant profiling
- **Station Management**: Police station administration

### ⚖️ **Court Administration**
- **Case Oversight**: Complete case lifecycle management
- **Inmate Management**: Prison administration and tracking
- **Probate Processing**: Estate and inheritance management
- **Staff Coordination**: Court personnel management
- **Transaction Tracking**: Payment and fee management

### 🏛️ **Ministry Administration**
- **System Analytics**: Comprehensive dashboards and reporting
- **Entity Management**: Oversee courts, police stations, and staff
- **Performance Monitoring**: Track system and user performance
- **Configuration Management**: System settings and maintenance
- **Audit Trails**: Complete activity logging

### 💰 **Financial Management**
- **Payment Processing**: Secure online payment integration
- **Transaction Tracking**: Payment status and history
- **Fee Management**: Court fees and service charges
- **Financial Reporting**: Revenue and transaction analytics

### 📧 **Communication System**
- **Email Notifications**: Automated emails for all major events
- **Welcome Emails**: User onboarding and verification
- **Case Updates**: Real-time notifications for case progress
- **Password Recovery**: Secure password reset functionality
- **Two-Factor Codes**: SMS/email verification codes

### ☁️ **File Storage & Media**
- **AWS S3 Integration**: Secure cloud storage for documents
- **UploadThing**: Optimized file upload service
- **Image Management**: Profile pictures and evidence photos
- **Document Security**: Access control and encryption

### 📊 **Analytics & Reporting**
- **Dashboard Analytics**: Real-time metrics and KPIs
- **Case Statistics**: Comprehensive case tracking reports
- **Performance Metrics**: User and system performance analysis
- **Financial Reports**: Revenue and transaction summaries
- **Custom Reporting**: Flexible report generation

## 🛠️ Technology Stack

### **Frontend**
- **Next.js 15.5.2**: React framework with App Router
- **React 19.1.1**: Latest React with concurrent features
- **TypeScript 5.0**: Full type safety and IntelliSense
- **Tailwind CSS 3.4**: Utility-first CSS framework
- **Radix UI**: Accessible component primitives
- **Framer Motion**: Smooth animations and transitions

### **Backend & Database**
- **NextAuth.js 5.0.0-beta**: Authentication and session management
- **Prisma 5.14**: Type-safe ORM for PostgreSQL
- **PostgreSQL 15**: Robust relational database
- **Server Actions**: Next.js API routes

### **External Services**
- **AWS S3**: Cloud file storage
- **UploadThing**: File upload optimization
- **Resend**: Email delivery service
- **Google/GitHub OAuth**: Social authentication

### **Development Tools**
- **ESLint**: Code quality and consistency
- **Prettier**: Code formatting
- **TypeScript**: Static type checking
- **Turbopack**: Fast development bundler

## 👥 User Roles & Permissions

### **1. Citizens (USER)**
- ✅ Register and manage personal profiles
- ✅ File cases and probates online
- ✅ Track case progress and status
- ✅ Make secure online payments
- ✅ Upload and manage documents
- ✅ Receive email notifications

### **2. Police Officers (POLICE)**
- ✅ Create and submit FIRs
- ✅ Manage draft case reports
- ✅ Upload evidence and photos
- ✅ Track submitted cases
- ✅ Access police station dashboard
- ✅ Generate case reports

### **3. Court Officials (COURT)**
- ✅ Manage assigned cases
- ✅ Schedule court hearings
- ✅ Process probates and estates
- ✅ Manage inmate records
- ✅ Oversee court staff
- ✅ Handle financial transactions
- ✅ Generate court reports

### **4. Judiciary Staff (STAFF)**
- ✅ Access staff dashboard
- ✅ Update personal information
- ✅ View performance metrics
- ✅ Access assigned tasks
- ✅ Generate personal reports

### **5. Ministry Administrators (ADMIN)**
- ✅ Full system access and control
- ✅ Manage all users and entities
- ✅ Configure system settings
- ✅ Access comprehensive analytics
- ✅ Generate system-wide reports
- ✅ Audit system activities

## 🚀 Installation & Setup

### **Prerequisites**
- Node.js 18+ and npm
- PostgreSQL 15+
- AWS S3 account (for file storage)
- Resend account (for emails)
- Git

### **1. Clone the Repository**
```bash
git clone https://github.com/DoudGaya/jigawa-moj.git
cd jigawa-moj
```

### **2. Install Dependencies**
```bash
npm install
```

### **3. Environment Configuration**
Create a `.env.local` file in the root directory:

```env
# Database
DATABASE_URL="postgresql://username:password@localhost:5432/jigawa_moj"
DIRECT_URL="postgresql://username:password@localhost:5432/jigawa_moj"

# NextAuth.js
NEXTAUTH_URL="http://localhost:3000"
NEXTAUTH_SECRET="your-nextauth-secret-here"

# OAuth Providers
GOOGLE_CLIENT_ID="your-google-client-id"
GOOGLE_CLIENT_SECRET="your-google-client-secret"
GITHUB_CLIENT_ID="your-github-client-id"
GITHUB_CLIENT_SECRET="your-github-client-secret"

# Email Service (Resend)
RESEND_API_KEY="re_your-resend-api-key"

# AWS S3 Configuration
AWS_ACCESS_KEY_ID="your-aws-access-key"
AWS_SECRET_ACCESS_KEY="your-aws-secret-key"
AWS_S3_BUCKET_NAME="your-s3-bucket-name"

# UploadThing (Optional)
UPLOADTHING_SECRET="your-uploadthing-secret"
UPLOADTHING_APP_ID="your-uploadthing-app-id"

# Node Environment
NODE_ENV="development"
```

### **4. Database Setup**
```bash
# Generate Prisma client
npx prisma generate

# Run database migrations
npx prisma db push

# (Optional) Seed the database
npx prisma db seed
```

### **5. Start Development Server**
```bash
npm run dev
```

Visit `http://localhost:3000` to access the application.

## 📊 Database Schema

### **Core Tables**
- **users**: User accounts with role-based profiles
- **cases**: Legal case management and tracking
- **police_stations**: Law enforcement unit management
- **courts**: Judicial court administration
- **staff**: Judiciary personnel records
- **customers**: Citizen profiles and information
- **inmates**: Prison administration
- **probates**: Estate and inheritance management
- **transactions**: Payment and financial tracking

### **Supporting Tables**
- **accounts**: OAuth provider connections
- **verification_tokens**: Email verification system
- **password_reset_tokens**: Password recovery
- **two_factor_tokens**: 2FA authentication
- **files**: Document and evidence storage
- **hearings**: Court hearing schedules

## 🔗 API Endpoints

### **Authentication**
- `POST /api/auth/signin` - User login
- `POST /api/auth/signup` - User registration
- `POST /api/auth/signout` - User logout
- `POST /api/auth/verify-email` - Email verification

### **Case Management**
- `GET /api/cases` - List cases (role-based)
- `POST /api/cases` - Create new case
- `PUT /api/cases/[id]` - Update case
- `DELETE /api/cases/[id]` - Delete case

### **File Upload**
- `POST /api/uploadthing` - File upload endpoint
- `GET /api/files/[id]` - Download file

### **User Management**
- `GET /api/users` - List users (admin only)
- `PUT /api/users/[id]` - Update user profile
- `DELETE /api/users/[id]` - Delete user

## 🎨 Design System

### **Color Palette**
- **Primary Green**: `#02923F` (Justice & Growth)
- **Secondary Green**: `#005344` (Authority)
- **Accent Yellow**: `#EDAE1B` (Hope & Progress)
- **Warning Red**: `#DB251C` (Urgency)
- **Dark**: `#1E1815` (Formality)

### **Typography**
- **Primary Font**: Poppins (Modern & Clean)
- **Secondary Font**: Montserrat (Professional)

### **UI Components**
- **Radix UI Primitives**: Accessible and customizable
- **Tailwind CSS**: Utility-first styling
- **Responsive Design**: Mobile-first approach
- **Dark Mode**: Theme switching capability

## 🔒 Security Features

- **Role-Based Access Control (RBAC)**
- **JWT Authentication with HttpOnly Cookies**
- **CSRF Protection**
- **XSS Prevention**
- **SQL Injection Prevention** (via Prisma ORM)
- **File Upload Security** (type and size validation)
- **Rate Limiting** on API endpoints
- **Audit Logging** for sensitive operations

## 📱 Responsive Design

- **Mobile-First Approach**: Optimized for smartphones
- **Tablet Support**: Adaptive layouts for tablets
- **Desktop Experience**: Full-featured desktop interface
- **Progressive Web App**: Installable on mobile devices
- **Accessibility**: WCAG 2.1 AA compliant

## 🚀 Deployment

### **Production Build**
```bash
npm run build
npm start
```

### **Environment Variables for Production**
Ensure all environment variables are set in your production environment:
- Database connection strings
- OAuth provider credentials
- AWS S3 configuration
- Email service API keys

### **Recommended Hosting**
- **Vercel**: Optimal for Next.js applications
- **Railway**: Full-stack deployment with PostgreSQL
- **AWS**: Scalable cloud infrastructure
- **DigitalOcean**: Cost-effective VPS hosting

## 🔮 Future Enhancements

### **Phase 1: Core Improvements**
- [ ] Mobile application companion
- [ ] SMS notification integration
- [ ] Advanced search and filtering
- [ ] Bulk operations for administrators
- [ ] API documentation with Swagger

### **Phase 2: Advanced Features**
- [ ] Video conferencing for virtual hearings
- [ ] AI-powered case analysis and recommendations
- [ ] Blockchain-based document verification
- [ ] Multi-language support (Hausa, English, Arabic)
- [ ] Integration with national justice systems

### **Phase 3: Analytics & Intelligence**
- [ ] Predictive analytics for case outcomes
- [ ] Machine learning for fraud detection
- [ ] Advanced reporting and business intelligence
- [ ] Real-time dashboard with live updates
- [ ] Performance benchmarking against national averages

## 🤝 Contributing

We welcome contributions to improve the jigawa State Ministry of Justice Portal!

### **Development Workflow**
1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

### **Code Standards**
- Follow TypeScript best practices
- Use ESLint and Prettier for code formatting
- Write comprehensive tests for new features
- Follow conventional commit messages
- Ensure accessibility compliance

## 📄 License

This project is proprietary software developed for the jigawa State Ministry of Justice. All rights reserved.

## 📞 Support & Contact

For technical support or inquiries:
- **Email**: support@jigawa-moj.gov.ng
- **Phone**: +234 (0) XXX XXX XXXX
- **Address**: jigawa State Ministry of Justice, Dutse, Nigeria

## 🙏 Acknowledgments

- **jigawa State Government** for the vision and support
- **Ministry of Justice** for domain expertise
- **Open Source Community** for the amazing tools and libraries
- **Development Team** for their dedication and hard work

---

**Built with ❤️ for Justice, Transparency, and Efficiency in jigawa State**
