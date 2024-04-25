import react from 'react'
import { FaUser, FaBell, FaBookOpen, FaCertificate, FaClipboardCheck } from 'react-icons/fa';

export const faqs = [
    {
        option: 'Account',
        icon: <FaUser />,
        faqs: [
            { summary: 'How do I create an account?', details: 'To create an account, click on the "Sign Up" link on the homepage. Fill in the required information, such as your username, email address, and password, and click "Signup."' },
            { summary: 'I forgot my password. How can I reset it?', details: 'You can reset your password by clicking on the "Forgot Password" link on the login page. Enter your email address, and we\'ll send you a link to reset your password.' },
            { summary: 'Can I change the email address associated with my account?', details: 'Yes, you can change your email address by going to the "Edit Profile" section after logging in. Select the option to change your email address and follow the instructions.' },
            { summary: ' How can I update my personal information, such as my address or phone number?', details: 'You can update your personal information by logging into your account and going to the "Edit" section. Here, you can edit your details and save the changes.' },
            { summary: 'Can I delete my account?', details: 'Yes, you can delete your account by contacting our support team. Please note that deleting your account will permanently remove all your data and cannot be undone.' }

        ]
    },
    // {
    //     option: 'noti',
    //     icon: <FaBell />,
    //     faqs: [
    //         { summary: 'What?', details: 'This is notification detail 1' },
    //         { summary: 'What?', details: 'This is notification detail 2' },
    //         { summary: 'What?', details: 'This is notification detail 3' },
    //         { summary: 'What?', details: 'This is notification detail 4' },
    //         { summary: 'What?', details: 'This is notification detail 5' }
    //     ]
    // },
    {
        option: 'grades',
        icon: <FaBookOpen />,
        faqs: [
            { summary: 'How can I view my grades?', details: 'You can view your grades by logging into your account and navigating to the "Progress" section. Here, you will find a list of all your courses and their corresponding grades.' },
            { summary: 'When will my grades be available?', details: 'Grades are typically available after the guide checks. You will receive a notification when your grades are ready to be viewed.' },
            { summary: 'How are grades calculated?', details: 'Grades are calculated based on various factors, including assignments, submission punctuality. Each task may have its own grading criteria.' },
            { summary: ' Can I appeal a grade if I believe it is incorrect?', details: 'Yes, you can appeal a grade by contacting your course instructor or the academic department responsible for the course. Provide them with any relevant information or documentation to support your appeal.' },
            { summary: 'Are there any academic policies regarding grades that I should be aware of?', details: 'Yes, our institution has academic policies regarding grading, such as grade appeals, grading scales, and grade calculation methods. These policies are outlined in the student handbook or academic catalog.' }

        ]
    },
    {
        option: 'certification',
        icon: <FaCertificate />,
        faqs: [
            { summary: 'How do I obtain a certification for completing a course?', details: 'To obtain a certification, you must successfully complete all the required coursework and assessments for the course. Once you have met the requirements, you can download your certification from the course page.' },
            { summary: 'Is there a fee for obtaining a certification?', details: 'Some certifications may require a fee for issuance. The fee, if applicable, will be mentioned on the course page.' },
            { summary: 'Are the certifications recognized?', details: 'Our certifications are recognized within the academic community and industry. However, recognition may vary depending on the institution or organization.' },
            { summary: 'Do I receive a physical certificate for completing a disseratation?', details: 'Certificates are typically available in digital format for download and printing. If you require a physical certificate, please contact our support team for assistance.' },
            { summary: 'Is there a time limit for completing a course and obtaining a certification?', details: 'Yes, each diseratation and particular task may have a specified duration within which you must complete the requirements to obtain a certification. The duration will be mentioned on the task page or in the disseratation materials.' },

        ]
    },
     {
         option: 'policies',
         icon: <FaClipboardCheck />,
         faqs: [
             { summary: 'What is your policy on account security?', details: 'We take account security seriously and employ measures such as encryption and regular security audits to protect your account information. We also recommend using strong, unique passwords and enabling two-factor authentication for added security.' },
             { summary: 'Do you share my account information with third parties?', details: 'We do not share your account information with third parties without your consent, except in cases where it is required by law or to provide you with the services you have requested.' },
             { summary: 'Can I transfer my account to another user?', details: 'No, accounts cannot be transferred to another user. Each account is intended for individual use only.' },
             { summary: 'Can I verify the authenticity of a certification issued by your institution?', details: 'Yes, you can verify the authenticity of a certification issued by our institution by contacting our registrar\'s office or using our online verification system.' },
             { summary: 'What is your privacy policy?', details: 'Our privacy policy outlines how we collect, use, and protect your personal information. It also explains your rights regarding your data and how you can contact us with any privacy-related concerns.' }
         ]
     }
];