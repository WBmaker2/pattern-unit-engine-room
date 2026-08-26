import { readFileSync } from 'node:fs';
import { resolve } from 'node:path';

import { describe, expect, it } from 'vitest';

const readme = readFileSync(resolve(import.meta.dirname, '../../README.md'), 'utf8');
const accessibilityChecklist = readFileSync(
  resolve(import.meta.dirname, '../../docs/qa/2026-08-26-accessibility-checklist.md'),
  'utf8',
);

describe('README 문서 계약', () => {
  it('필수 섹션과 경계를 모두 설명한다', () => {
    // 학습 목표와 단계 흐름
    expect(readme).toContain('가장 짧은 반복 단위');
    expect(readme).toContain('AB·AAB·ABB·ABC');
    expect(readme).toContain('찾기→이어 붙이기→수리→번역→자유 제작→활동 도장');
    expect(readme).toMatch(/단위 찾기/);
    expect(readme).toMatch(/자유 규칙/);

    // 기존 앱과의 차별성 및 MVP 규모
    expect(readme).toContain('기존 단순 다음 항 맞히기 앱');
    expect(readme).toContain('미션 20개');
    expect(readme).toContain('5 Journeys');
    expect(readme).toContain('4개 구조');

    // 판정 경계
    expect(readme).toContain('부분 빈칸 인덱스');
    expect(readme).toContain('일대일 번역+순서');
    expect(readme).toContain('2~3칸 단위 최소 2회');
    expect(readme).toContain('최소 단위');

    // 서버 없는 개인정보 경계
    expect(readme).toContain('서버/계정 없음');
    expect(readme).toContain('기본으로 저장하지 않습니다');
    expect(readme).toContain('opt-in exact minimal localStorage');
    expect(readme).toContain('학생 음성을 녹음하지 않습니다');
    expect(readme).toContain('로컬 MP3 선택 재생');
    expect(readme).toMatch(/학생 이름.*사진.*음성.*점수.*속도.*순위.*시간.*비수집/);

    // 설치 및 품질 게이트 명령
    for (const command of [
      'npm ci',
      'npm run dev',
      'npm run test',
      'npm run test:e2e',
      'npm run build',
      'npm run check',
      'npm run check:size',
    ]) {
      expect(readme).toContain(command);
    }
    expect(readme).toMatch(/Node(?:\.js)? 22/);

    // 접근성, 업데이트 이력, 자동·수동 검증 경계
    for (const phrase of [
      '48×48',
      '320px',
      '200%',
      'keyboard',
      'Axe',
      'reduced motion',
      '색상 독립',
      '업데이트 내역',
      '자동 PASS',
      '수동 검증 대기',
      'Safari+VoiceOver',
    ]) {
      expect(readme).toContain(phrase);
    }
    expect(readme).toMatch(/전체 수동 PASS.*아니|전체 수동 PASS.*주장하지/);
    expect(readme).toContain('사람의 청취 검수 대기');
    expect(readme).toMatch(/docs\/qa\/.*accessibility-checklist\.md/);
    expect(readme).toMatch(/\.\.\/docs\/qa\/|\[.*접근성.*\]\(docs\/qa\//);

    // Safari VoiceOver와 별개인 로컬 안내 음성의 사람 청취 검수
    expect(accessibilityChecklist).toContain('## 로컬 안내 음성 사람 청취 검수');
    expect(accessibilityChecklist).toContain('사람의 청취 검수 대기');
    for (const criterion of ['발음', '속도', '명료도', '아동 적합성', '볼륨']) {
      expect(accessibilityChecklist).toContain(criterion);
    }
    expect(accessibilityChecklist).toMatch(/사람.*듣기 전.*PASS.*아니|PASS.*표시하지 않습니다/);

    // 로컬 실행과 GitHub Pages 배포 범위
    expect(readme).toContain('https://wbmaker2.github.io/pattern-unit-engine-room/');
    expect(readme).toContain('배포 예정 공개 주소');
    expect(readme).toContain('main');
    expect(readme).toContain('workflow_dispatch');
    expect(readme).toContain('GitHub Actions');
    expect(readme).toContain('dist');
    expect(readme).toContain('github-pages');
    expect(readme).toMatch(/로컬 실행/);
  });
});
