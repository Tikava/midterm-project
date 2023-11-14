import { Router } from 'express';
import { MessageService } from '../services/message-service.js';

const router = Router();
const messageService = new MessageService();

// Send a message in a conversation
router.post('/:conversationId/send', async (req, res) => {
    const { conversationId } = req.params;
    const message = req.body;

    try {
        const messageRef = await messageService.sendMessage(conversationId, message);
        res.status(201).json({ message: 'Message sent', messageId: messageRef.key });
    } catch (error) {
        res.status(500).json({ message: 'Failed to send message', error: error.message });
    }
});

// Get a specific message in a conversation
router.get('/:conversationId/:messageId', async (req, res) => {
    const { conversationId, messageId } = req.params;

    try {
        const message = await messageService.getMessage(conversationId, messageId);
        res.json({ message });
    } catch (error) {
        res.status(404).json({ message: 'Message not found', error: error.message });
    }
});

// Update a specific message in a conversation
router.put('/:conversationId/:messageId', async (req, res) => {
    const { conversationId, messageId } = req.params;
    const messageData = req.body;

    try {
        await messageService.updateMessage(conversationId, messageId, messageData);
        res.json({ message: 'Message updated' });
    } catch (error) {
        res.status(500).json({ message: 'Failed to update message', error: error.message });
    }
});

// Delete a specific message in a conversation
router.delete('/:conversationId/:messageId', async (req, res) => {
    const { conversationId, messageId } = req.params;

    try {
        await messageService.deleteMessage(conversationId, messageId);
        res.json({ message: 'Message deleted' });
    } catch (error) {
        res.status(500).json({ message: 'Failed to delete message', error: error.message });
    }
});

export default router;
