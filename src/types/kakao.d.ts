declare global {
  interface KakaoLinkObject {
    webUrl?: string;
    mobileWebUrl?: string;
  }

  interface KakaoFeedContent {
    title: string;
    description?: string;
    imageUrl: string;
    imageWidth?: number;
    imageHeight?: number;
    link: KakaoLinkObject;
  }

  interface KakaoFeedButton {
    title: string;
    link: KakaoLinkObject;
  }

  interface KakaoFeedTemplate {
    objectType: "feed";
    content: KakaoFeedContent;
    buttons?: KakaoFeedButton[];
    installTalk?: boolean;
  }

  interface KakaoStatic {
    init(jsKey: string): void;
    isInitialized(): boolean;
    cleanup(): void;
    Share: {
      sendDefault(settings: KakaoFeedTemplate): void;
      cleanup(): void;
    };
  }

  interface Window {
    Kakao?: KakaoStatic;
  }
}

export {};
