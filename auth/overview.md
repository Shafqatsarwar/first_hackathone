# Authentication System with Better-Auth

## Overview

The authentication system for this textbook is implemented using Better-Auth (https://www.better-auth.com/), a complete authentication solution for modern web applications. The system enables user signup and signin functionality, and collects user information to enable content personalization.

## Features

1. **User Registration**: Secure signup with email and password
2. **User Signin**: Secure login with email and password
3. **User Profile**: Store user information including background and preferences
4. **Background Questions**: Collect information about user's software and hardware experience during signup
5. **Session Management**: Secure session handling
6. **Integration**: Seamless integration with the textbook and personalization features

## Background Questions

During signup, users will be asked questions about their software and hardware background, including:

- Programming experience level (beginner, intermediate, advanced)
- Robotics experience (none, basic, intermediate, advanced)
- Hardware access (no hardware, simulation only, RTX workstation, complete lab)
- Educational background (high school, undergraduate, graduate, professional)
- Specific interests in Physical AI topics

## Implementation Plan

1. **Better-Auth Setup**: Configure Better-Auth with Next.js compatibility
2. **User Schema Extension**: Add fields for background information
3. **Signup Flow**: Create signup form with background questions
4. **Signin Flow**: Create signin form
5. **Profile Management**: Allow users to update their background information
6. **Integration**: Connect with personalization features
7. **Security**: Implement secure session management

## API Endpoints

- `POST /api/auth/signin`: Authenticate user
- `POST /api/auth/signup`: Register new user with background info
- `POST /api/auth/signout`: End user session
- `GET /api/auth/me`: Get current user information
- `PUT /api/auth/profile`: Update user profile and background info

## Data Schema

User model extended with:
- `softwareExperience`: Enum (beginner, intermediate, advanced)
- `roboticsExperience`: Enum (none, basic, intermediate, advanced)
- `hardwareAccess`: Enum (none, simulation, workstation, complete_lab)
- `educationLevel`: Enum (high_school, undergraduate, graduate, professional)
- `interests`: Array of Physical AI topics
- `personalizationEnabled`: Boolean for content personalization