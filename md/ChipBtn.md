CLAUDE.md, components.md를 읽어줘.
src/components/ChipBtn.jsx를 만들어줘.

요구사항:
- 장르/키워드 필터 버튼 컴포넌트
- 호버 시 보라색으로 변경

props:
- label (string): 버튼 텍스트
- active (boolean): 활성화 상태
- onClick (function): 클릭 핸들러

스타일:
1. active=false (비활성):
   - bg-zinc-800
   - hover:bg-primary-400 (호버 시 보라색)
   - hover:text-primary-900
   - transition-all duration-200
2. active=true (활성):
   - bg-primary-400 (보라색)
   - text-primary-900
3. 공통:
   - rounded-full
   - px-4 py-2
   - text-sm font-medium
   - cursor-pointer

새 패키지 설치하지 마.
완결된 코드로 제공해줘.