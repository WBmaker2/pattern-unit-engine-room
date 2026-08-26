import { readdir, readFile } from 'node:fs/promises';
import { join, relative, resolve } from 'node:path';
import { describe, expect, it } from 'vitest';

const projectRoot = resolve(import.meta.dirname, '../..');
const sourceDirectories = ['src', 'tests', 'scripts'];
const configFilePattern = /\.config\.[^/]+$/;

async function collectFiles(directory: string): Promise<string[]> {
  let entries;
  try {
    entries = await readdir(directory, { withFileTypes: true });
  } catch {
    return [];
  }

  const files = await Promise.all(
    entries.map(async (entry) => {
      const entryPath = join(directory, entry.name);
      if (entry.isDirectory()) {
        return collectFiles(entryPath);
      }
      return [entryPath];
    }),
  );

  return files.flat();
}

describe('코드 크기 게이트', () => {
  it('모든 코드 파일이 499줄 이하이다', async () => {
    const allFiles = await collectFiles(projectRoot);
    const sourceFiles = allFiles.filter((filePath) => {
      const fileName = relative(projectRoot, filePath);
      return (
        sourceDirectories.some(
          (directory) =>
            fileName === directory || fileName.startsWith(`${directory}/`),
        ) || configFilePattern.test(fileName)
      );
    });
    const oversized = [] as string[];

    for (const filePath of sourceFiles) {
      const lineCount = (await readFile(filePath, 'utf8')).split('\n').length;
      if (lineCount >= 500) {
        oversized.push(relative(projectRoot, filePath));
      }
    }

    expect(oversized).toEqual([]);
  });
});
