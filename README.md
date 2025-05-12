# SafeZoneSentient – A Cloud-Based War Crisis Management System

## Course Information
**CE308 – Cloud Computing**  
Submitted to: Ma'am Safia Baloch

## Team Members
- Saad – 2022509
- Ahmed – 2022054
- Aiza – 2022077
- Mustafa – 2022407

## Introduction
SafeZoneSentient is a cloud-native crisis management system designed for high-stakes scenarios like war zones or large-scale disasters. The platform provides real-time, trustworthy information through a public-facing interface that disseminates verified alerts, facilitates civilian reporting, and assists with situation awareness through map-based visualizations and real-time notifications.

Built entirely on Amazon Web Services (AWS), the solution is:
- Highly available
- Fully serverless
- Event-driven
- Resilient under unpredictable, large-scale usage

## Core Features

### Admin Features (ISPR)
- Post verified alerts
- Update zone data
- Trigger mass alerts
- Manage facility status
- Monitor civilian reports

### Civilian Features
- View nearby safe zones, shelters, and danger zones
- Submit danger or help reports
- Receive email alerts (for subscribed users)
- Interactive map interface
- Real-time status updates

## Technical Architecture

### Frontend Stack
- React.js for dynamic UI rendering
- Leaflet.js for interactive maps
- Axios for API integration
- Tailwind CSS for responsive styling

### AWS Services Integration
1. **Amazon S3**
   - Static website hosting
   - HTTPS-based secure content delivery
   - Cross-region replication for geo-resilience

2. **Amazon API Gateway**
   - RESTful APIs for alerts, reports, zones, shelters
   - CORS and throttling support
   - Direct Lambda and DynamoDB integration

3. **Amazon DynamoDB**
   - Tables: Reports, Facilities, Zones, Shelters
   - High throughput with auto-scaling
   - Stream-based event triggering
   - IAM policy-controlled access

4. **AWS Lambda**
   - ProcessingIncomeReports: Validates and processes civilian reports
   - ProcessingSecurityReports: Detects and classifies new reports

5. **Amazon SNS**
   - Notification and alert system
   - Email notifications for verified crisis reports
   - Event-driven design for instant delivery

## System Workflow
1. **Civilian Reporting**
   ```
   [React Frontend (S3)] → [API Gateway] → [Lambda] → [DynamoDB] → [SNS] → [Email Alerts]
   ```

2. **Admin Operations**
   ```
   [Admin Panel] → [API Gateway] → [Lambda] → [DynamoDB] → [SNS] → [Public Alerts]
   ```

## Cloud-Native Benefits
- **Serverless Computing**: Lambda, API Gateway, DynamoDB
- **Event-Driven Architecture**: DynamoDB Stream → Lambda → SNS
- **Auto Scalability**: On-demand scaling for all services
- **High Availability**: Multi-AZ managed services
- **Real-Time Communication**: SNS email alerts
- **Zero Infrastructure Ops**: No EC2, full serverless
- **Global Reach**: Region-agnostic with replication
- **Cost-Efficient**: Pay-per-use model
- **Secure Access**: IAM + HTTPS + CORS

## Future Enhancements
- [ ] Mobile application (Flutter / React Native)
- [ ] Push notifications (Firebase Cloud Messaging)
- [ ] Real-time chat with responders (WebSockets)
- [ ] AI-powered report classification (Amazon SageMaker)
- [ ] Offline mode with PWA caching
- [ ] User authentication (Amazon Cognito)
- [ ] Multi-language support (Urdu, Pashto, Sindhi)

## Installation
```bash
# Clone the repository
git clone https://github.com/saadhaniftaj/Safezone-Sentinel--WartimePlatform-.git

# Navigate to project directory
cd safezone-sentinel

# Install dependencies
npm install

# Start development server
npm run dev
```

## Contributing
1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## License
This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## Acknowledgments
- Developed as part of CE308 – Cloud Computing course
- Submitted to: Ma'am Safia Baloch
- Special thanks to the entire development team for their dedication and hard work 