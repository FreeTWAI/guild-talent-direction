import {test} from 'node:test';
import assert from 'node:assert/strict';
import {readFile} from 'node:fs/promises';
import {renderWorkspace, escapeHtml} from '../scripts/build.mjs';

const workspace = JSON.parse(await readFile(new URL('../workspace.json', import.meta.url), 'utf8'));

test('Performance: renderWorkspace should execute efficiently over multiple iterations', () => {
  const iterations = 10000;
  const start = performance.now();
  for (let i = 0; i < iterations; i++) {
    renderWorkspace(workspace);
  }
  const end = performance.now();
  const duration = end - start;

  console.log(`renderWorkspace benchmark: ${iterations} iterations in ${duration.toFixed(2)}ms`);

  // Assert that rendering 10k times takes less than 1000ms (adjust threshold if necessary)
  assert.ok(duration < 1000, `renderWorkspace took too long: ${duration}ms`);
});

test('Performance: escapeHtml should execute efficiently', () => {
  const testString = '<html>"Hello" & \'World\'</html>';
  const iterations = 50000;

  const start = performance.now();
  for (let i = 0; i < iterations; i++) {
    escapeHtml(testString);
  }
  const end = performance.now();
  const duration = end - start;

  console.log(`escapeHtml benchmark: ${iterations} iterations in ${duration.toFixed(2)}ms`);

  // Assert that escaping 50k times takes less than 500ms
  assert.ok(duration < 500, `escapeHtml took too long: ${duration}ms`);
});
