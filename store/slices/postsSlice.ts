import { createSlice } from "@reduxjs/toolkit";

export interface IPostState {
  data: any;
}

const initialState: IPostState = {
  data: [
    {
      description:
        "Introduction to Web Development: This course provides a comprehensive foundation for building modern web applications. You'll learn the fundamentals of HTML, CSS, and JavaScript, the core technologies that power the web. Through hands-on exercises, you'll gain the skills to create interactive web pages, style them with CSS, and add dynamic behavior using JavaScript. Whether you're aiming for a career in web development or simply want to enhance your understanding of the web, this course equips you with the essential tools to get started.",
      title: "Web Dev 101",
      level: "Beginner",
    },
    {
      description:
        "Data Analysis with Python: In this course, you'll delve into the exciting world of data science using Python, a powerful programming language widely employed for data analysis and machine learning. You'll gain hands-on experience with popular libraries like NumPy, Pandas, and Matplotlib, enabling you to clean, manipulate, analyze, and visualize data. The course covers essential concepts like data exploration, statistical analysis, and data wrangling, equipping you to extract valuable insights from datasets.",
      title: "Python for Data Science",
      level: "Intermediate",
    },
    {
      description:
        "Mastering Machine Learning Algorithms: This advanced course delves into the intricate world of machine learning algorithms. You'll build a solid foundation in core concepts like supervised learning, unsupervised learning, and deep learning. Through practical exercises, you'll explore a range of algorithms, including linear regression, decision trees, neural networks, and support vector machines. By understanding their strengths and weaknesses, you'll be able to select the most appropriate algorithm for your specific data science problems.",
      title: "Advanced ML",
      level: "Expert",
    },
    {
      description:
        "Creating Mobile Apps with React Native: Ready to take the plunge into mobile app development? This course introduces you to React Native, a powerful framework that allows you to build native-looking mobile apps for iOS and Android using JavaScript and React. You'll learn fundamental React Native concepts like components, state management, and navigation. By the end of the course, you'll be equipped to build basic mobile applications and explore further possibilities within the React Native ecosystem.",
      title: "React Native Fundamentals",
      level: "Beginner",
    },
    {
      description:
        "Developing Secure Web Applications: In today's digital world, web security is paramount. This course equips you with the knowledge and skills to build secure web applications. You'll explore common web vulnerabilities such as SQL injection, cross-site scripting (XSS), and security misconfigurations. The course delves into best practices for secure coding, data validation, and user authentication, empowering you to create robust and secure web applications that protect user data and prevent security breaches.",
      title: "Web Security",
      level: "Intermediate",
    },
    {
      description:
        "Exploring 3D Graphics with Unity: Unleash your creativity and delve into the world of 3D game development with Unity. This course introduces you to the Unity game engine, a powerful platform widely used to create stunning 3D games and interactive experiences. You'll explore core concepts like game objects, components, and scripting. Through hands-on projects, you'll learn how to build 3D environments, create engaging characters, and implement basic gameplay mechanics, equipping you with the foundation to develop your own 3D games in Unity.",
      title: "Game Development with Unity",
      level: "Intermediate",
    },
    {
      description:
        "Mastering the Art of Digital Painting: Immerse yourself in the vibrant world of digital painting and unleash your inner artist. This course explores advanced techniques used by professional digital painters. You'll learn how to leverage digital brushes and textures to create realistic effects, explore light and shadow manipulation, and develop compelling compositions. From mastering color balance and harmony to building dynamic brushwork and storytelling elements, this course elevates your digital painting skills to the next level.",
      title: "Digital Painting Techniques",
      level: "Advanced",
    },
    {
      description: "Composing Engaging Music for Film",
      title: "Film Scoring Fundamentals",
      level: "Beginner",
    },
    {
      description: "Unveiling the Secrets of the Stock Market",
      title: "Investment Strategies",
      level: "Intermediate",
    },
    {
      description: "Building a Strong Foundation in English Literature",
      title: "Introduction to English Literature",
      level: "Beginner",
    },

    {
      description:
        "This course builds a foundation for modern web apps with HTML, CSS, and JavaScript. Create interactive web pages and add dynamic behavior.",
      title: "Web Dev 101",
      level: "Beginner",
    },
    {
      description:
        "Learn data science with Python. Use popular libraries like NumPy, Pandas, and Matplotlib to clean, analyze, and visualize data.",
      title: "Python for Data Science",
      level: "Intermediate",
    },
    {
      description:
        "This advanced course explores machine learning algorithms like supervised learning, unsupervised learning, and deep learning. You'll gain practical experience with various algorithms.",
      title: "Advanced ML",
      level: "Expert",
    },
    {
      description:
        "Build native-looking mobile apps for iOS and Android using JavaScript and React with React Native. Learn core concepts like components and navigation.",
      title: "React Native Fundamentals",
      level: "Beginner",
    },
    {
      description:
        "Gain the knowledge and skills to build secure web applications. Explore common vulnerabilities and best practices for secure coding and user authentication.",
      title: "Web Security",
      level: "Intermediate",
    },
    {
      description:
        "Unleash your creativity and delve into 3D game development with Unity. Build 3D environments, create characters, and implement basic gameplay mechanics.",
      title: "Game Development with Unity",
      level: "Intermediate",
    },
    {
      description:
        "This course explores advanced techniques used by professional digital painters. Learn to create realistic effects, manipulate light and shadow, and develop compelling compositions.",
      title: "Digital Painting Techniques",
      level: "Advanced",
    },
    {
      description:
        "Learn the fundamentals of film scoring, the art of composing music specifically designed to complement and enhance films. Create captivating music for your projects.",
      title: "Composing Engaging Music for Film",
      level: "Intermediate",
    },
    {
      description:
        "Discover investment strategies to navigate the stock market. This course offers insights into making informed investment decisions.",
      title: "Investment Strategies",
      level: "Intermediate",
    },
    {
      description:
        "Build a strong foundation in English literature. Explore classic works and gain an understanding of literary analysis.",
      title: "Introduction to English Literature",
      level: "Beginner",
    },
  ],
};

export const postSlice = createSlice({
  name: "posts",
  initialState,
  reducers: {
    addPost: (state, action) => {
      const posts = state.data;
      const newPosts = action.payload.files.map((file:any) => ({
        uri: file.uri,
        filename: file.name,
      }));
      state.data = [...posts, {...action?.payload,files:newPosts}];
      return state;
    },
  },
});

export const { addPost } = postSlice.actions;
export default postSlice.reducer;
