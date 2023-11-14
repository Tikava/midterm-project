import { Router } from 'express';
import { ConversationService } from '../services/conversation-service.js';
import { authMiddleware } from '../middleware/auth-middleware.js';

const router = Router();
const conversationService = new ConversationService();

// Create a new conversation
// conversation-routes.js
router.post('/create', authMiddleware, async (req, res) => {
    // Extract conversation data from the request body
    const { title, members, lastMessage } = req.body;

    try {
        // Validate the data as needed
        if (!title || !Array.isArray(members) || members.length === 0) {
            return res.status(400).json({ message: 'Invalid conversation data' });
        }

        // Call the service method to create a new conversation
        const newConversationRef = await conversationService.createConversation({ title, members, lastMessage });

        // Respond with success and the new conversation ID
        res.status(201).json({ message: 'Conversation created', conversationId: newConversationRef.key });
    } catch (error) {
        res.status(400).json({ message: 'Failed to create conversation', error: error.message });
    }
});


// Get a specific conversation
router.get('/:conversationId', authMiddleware, async (req, res) => {
    const { conversationId } = req.params;

    try {
        const conversation = await conversationService.getConversation(conversationId);
        res.json({ conversation });
    } catch (error) {
        res.status(404).json({ message: 'Conversation not found', error: error.message });
    }
});

// Get all conversations
router.get('/', authMiddleware, async (req, res) => {
    try {
        const conversations = await conversationService.getAllConversations(); // You need to implement this method
        res.json({ conversations });
    } catch (error) {
        res.status(500).json({ message: 'Failed to get conversations', error: error.message });
    }
});

// Update a specific conversation
router.put('/:conversationId', authMiddleware, async (req, res) => {
    const { conversationId } = req.params;
    const conversationData = req.body;

    try {
        await conversationService.updateConversation(conversationId, conversationData);
        res.json({ message: 'Conversation updated' });
    } catch (error) {
        res.status(500).json({ message: 'Failed to update conversation', error: error.message });
    }
});

// Delete a specific conversation
router.delete('/:conversationId', authMiddleware, async (req, res) => {
    const { conversationId } = req.params;

    try {
        await conversationService.deleteConversation(conversationId);
        res.json({ message: 'Conversation deleted' });
    } catch (error) {
        res.status(500).json({ message: 'Failed to delete conversation', error: error.message });
    }
});

export default router;
