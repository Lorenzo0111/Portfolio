import type { ChatMessage } from "@/lib/chat/tools";

const STORAGE_KEY = "chat-messages";

export function loadMessages(): ChatMessage[] {
  try {
    return JSON.parse(sessionStorage.getItem(STORAGE_KEY) ?? "[]");
  } catch {
    return [];
  }
}

export function saveMessages(messages: ChatMessage[]) {
  try {
    sessionStorage.setItem(STORAGE_KEY, JSON.stringify(messages));
  } catch {
    // Storage unavailable, the conversation just won't survive a reload
  }
}
