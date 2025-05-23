import { format } from 'date-fns';

export const currentUser = {
  id: 'user-1',
  name: 'Luis Easton',
  role: 'Support Agent',
  avatar: 'https://images.pexels.com/photos/2379005/pexels-photo-2379005.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
};

const generateTime = (minutesAgo) => {
  const date = new Date();
  date.setMinutes(date.getMinutes() - minutesAgo);
  return date;
};

export const conversations = [
  {
    id: 'conv-1',
    customer: {
      id: 'customer-1',
      name: 'Luis',
      company: 'Github',
      avatar: 'https://images.pexels.com/photos/614810/pexels-photo-614810.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
    },
    subject: 'I bought a product from your store in November as a Christmas gift for a member of my family.',
    snippet: 'Hey! I have a question...',
    unread: true,
    priority: 'medium',
    status: 'open',
    lastMessage: generateTime(45),
    tags: ['returns', 'refund'],
    messages: [
      {
        id: 'msg-1',
        sender: 'customer',
        content: 'I bought a product from your store in November as a Christmas gift for a member of my family. However, it turns out that they have something very similar already. I was hoping you\'d be able to refund me, as it is un-opened.',
        timestamp: generateTime(60),
        status: 'delivered',
      },
      {
        id: 'msg-2',
        sender: 'agent',
        content: 'Let me just look into this for you, Luis.',
        timestamp: generateTime(55),
        status: 'seen',
        agentId: 'user-1',
      },
      {
        id: 'msg-3',
        sender: 'ai',
        content: 'Hi, I\'m Fin AI Copilot\nAsk me anything about this conversation.',
        timestamp: generateTime(54),
      },
    ],
  },
  {
    id: 'conv-2',
    customer: {
      id: 'customer-2',
      name: 'Ivan',
      company: 'Nike',
      avatar: 'https://images.pexels.com/photos/220453/pexels-photo-220453.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
    },
    subject: 'Order delay',
    snippet: 'Hi there, I have a question about my order...',
    unread: true,
    priority: 'high',
    status: 'open',
    lastMessage: generateTime(30),
    tags: ['order', 'shipping'],
    messages: [
      {
        id: 'msg-1',
        sender: 'customer',
        content: 'Hi there, I have a question about my order #12345. It was supposed to arrive yesterday but I haven\'t received it yet. Can you help me track it?',
        timestamp: generateTime(35),
        status: 'delivered',
      },
    ],
  },
  {
    id: 'conv-3',
    customer: {
      id: 'customer-3',
      name: 'Lead from New York',
      company: '',
      avatar: 'https://images.pexels.com/photos/1222271/pexels-photo-1222271.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
    },
    subject: 'Product inquiry',
    snippet: 'Good morning, let me know...',
    unread: false,
    priority: 'medium',
    status: 'open',
    lastMessage: generateTime(45),
    tags: ['sales', 'inquiry'],
    messages: [
      {
        id: 'msg-1',
        sender: 'customer',
        content: 'Good morning, I\'m interested in your premium package. Could you provide more details about the features included?',
        timestamp: generateTime(50),
        status: 'delivered',
      },
    ],
  },
  {
    id: 'conv-4',
    customer: {
      id: 'customer-4',
      name: 'Booking API problems',
      company: 'Small Crafts',
      avatar: '',
    },
    subject: 'Bug report',
    snippet: 'Bug report',
    unread: false,
    priority: 'medium',
    status: 'open',
    lastMessage: generateTime(45),
    tags: ['technical', 'bug'],
    messages: [
      {
        id: 'msg-1',
        sender: 'customer',
        content: 'We\'re experiencing issues with the booking API. The endpoint /api/v1/bookings is returning a 500 error intermittently.',
        timestamp: generateTime(65),
        status: 'delivered',
      },
    ],
  },
  {
    id: 'conv-5',
    customer: {
      id: 'customer-5',
      name: 'Miracle',
      company: 'Exemplary Bank',
      avatar: 'https://images.pexels.com/photos/415829/pexels-photo-415829.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
    },
    subject: 'Account upgrade',
    snippet: 'Hey there, I\'m here to...',
    unread: false,
    priority: 'low',
    status: 'open',
    lastMessage: generateTime(45),
    tags: ['account', 'upgrade'],
    messages: [
      {
        id: 'msg-1',
        sender: 'customer',
        content: 'Hey there, I\'m here to inquire about upgrading our account to the enterprise plan. What are the steps involved?',
        timestamp: generateTime(70),
        status: 'delivered',
      },
    ],
  }
];

export const suggestions = [
  {
    id: 'sug-1',
    content: 'How do I get a refund?',
  },
  {
    id: 'sug-2',
    content: 'What\'s your return policy?',
  },
  {
    id: 'sug-3',
    content: 'How long do refunds take to process?',
  }
];

export const getAIResponse = (query) => {
  const responses = {
    refund: "Based on our policy, we offer **refunds** for unopened items within **30 days** of purchase. I can help process this refund request. Would you like me to guide you through the process?",
    return: "Our **return policy** allows returns within **30 days** of purchase. The item must be in its original condition with tags attached. Here's what you need to do:\n\n1. **Package the item** securely\n2. Include the **original receipt**\n3. Use our **return shipping label**",
    shipping: "We offer multiple shipping options:\n\n- **Standard shipping**: 3-5 business days\n- **Express shipping**: 1-2 business days\n- **Same-day delivery**: Available in select areas",
    payment: "We accept the following **payment methods**:\n\n- Credit/Debit cards\n- PayPal\n- Apple Pay\n- Google Pay",
    default: "I'm here to help! I notice you're discussing a return. Here are some key points:\n\n- **30-day return window**\n- **Original packaging** required\n- **Free return shipping**\n\nWhat specific information can I provide?"
  };

  const lowercaseQuery = query.toLowerCase();
  
  if (lowercaseQuery.includes('refund')) return responses.refund;
  if (lowercaseQuery.includes('return')) return responses.return;
  if (lowercaseQuery.includes('shipping')) return responses.shipping;
  if (lowercaseQuery.includes('payment')) return responses.payment;
  return responses.default;
};

export const formatTime = (date) => {
  const now = new Date();
  const diff = Math.floor((now - date) / 1000 / 60); // difference in minutes
  
  if (diff < 1) {
    return 'Just now';
  } else if (diff < 60) {
    return `${diff}m`;
  } else if (diff < 24 * 60) {
    return format(date, 'h:mm a');
  } else if (diff < 48 * 60) {
    return 'Yesterday';
  } else {
    return format(date, 'MMM d');
  }
};