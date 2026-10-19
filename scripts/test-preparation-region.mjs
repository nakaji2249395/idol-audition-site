import { test } from 'node:test';
import assert from 'node:assert/strict';
import { preparationRegion } from '../lib/preparationRegion.ts';

test('regional and mixed listings never select Tokyo-only school', () => {
  for (const area of ['大阪','大阪府内','関西','名古屋','愛知県','東海','東京・大阪','東京・名古屋','全国（東京含む）','東京・福岡','東京・京都','埼玉','不明','']) {
    assert.equal(preparationRegion(area).useWacca, false, area);
  }
  assert.equal(preparationRegion('大阪').label, '大阪');
  assert.equal(preparationRegion('愛知県名古屋市').label, '名古屋');
  assert.equal(preparationRegion('東京・大阪・名古屋').label, '大阪・名古屋');
  assert.equal(preparationRegion('全国（大阪・名古屋含む）').label, '');
  assert.equal(preparationRegion('東京都内').useWacca, true);
});
