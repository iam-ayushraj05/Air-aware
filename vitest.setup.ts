import "@testing-library/jest-dom/vitest";
import { expect } from "vitest";
import * as matchers from "vitest-axe/matchers";

expect.extend(matchers);

// Mock window.matchMedia
Object.defineProperty(window, "matchMedia", {
  writable: true,
  value: (query: string) => ({
    matches: false,
    media: query,
    onchange: null,
    addListener: () => {},
    removeListener: () => {},
    addEventListener: () => {},
    removeEventListener: () => {},
    dispatchEvent: () => false,
  }),
});

// Mock Notification
class MockNotification {
  static permission: NotificationPermission = "default";
  static requestPermission = async (): Promise<NotificationPermission> => "granted";
  constructor(
    public title: string,
    public options?: NotificationOptions
  ) {}
}
// @ts-expect-error mock notification
global.Notification = MockNotification;
