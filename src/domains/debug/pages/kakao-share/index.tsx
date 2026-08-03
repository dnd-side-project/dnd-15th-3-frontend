import { KakaoShareButton } from "../../../../components/kakao-share-button";

export function KakaoSharePage() {
  return (
    <div
      style={{
        maxWidth: 640,
        margin: "0 auto",
        padding: 24,
        display: "flex",
        flexDirection: "column",
        gap: 16,
      }}
    >
      <div>
        <h1 style={{ fontSize: 20, margin: 0 }}>카카오톡 공유 테스트</h1>
        <p style={{ color: "#666", fontSize: 14, margin: "4px 0 0" }}>
          이미지 + 텍스트 + 참여하기 버튼(sendDefault feed)으로 링크를 공유합니다. (등록 도메인
          localhost:5173)
        </p>
      </div>

      <KakaoShareButton
        title="모모(momo) - 모임 초대를 받았어요"
        description="친구들과 함께 모임 코스를 계획해보세요"
        imageUrl="/static/momo-kakao-share.png"
        imageWidth={800}
        imageHeight={450}
        buttonTitle="참여하기"
      />
    </div>
  );
}
