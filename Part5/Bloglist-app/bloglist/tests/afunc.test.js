import test from 'node:test'
import assert from 'node:assert'
import fns from '../utils/list_helper.js'
import { describe } from 'node:test'

test('works or not', () => {
    assert.strictEqual(fns.afunc(4), 16 )
})
test('returns 0 when input is 0', () => {
    assert.strictEqual(fns.afunc(0), 0)
})

test('returns negative when input is negative', () => {
    assert.strictEqual(fns.afunc(-2), -8)
})

test('returns 1', () => {
    assert.strictEqual(fns.dummy(), 1)
})
test('dummy returns always 1', () => {
    const blogs = ["TI"]
    assert.strictEqual(fns.dummy(blogs), 1)
})

describe( ('total likes'), () => {
    const blogs =
    [
    {
        "title": "Mountain Hiking Guide",
        "url": "https://adventurezone.com/hiking",
        "likes": 512,
        "id": "6831a145d9fe1c001fd3a018"
    }]

    const blogs1 =
    [
    {
        "title": "Learn TypeScript in 30 Days", "likes": 600
    },
    {
        "title": "Understanding AI Ethics", "likes": 410
    },
    {
        "title": "Best Coffee Beans in 2025", "likes": 273
    }
    ]

    test('returns nooflikes when one one in the list', () => {
        assert.strictEqual(fns.totalLikes(blogs), 512);
    })

    test('returns when more than one blogs', () => {
        assert.strictEqual(fns.totalLikes(blogs1),1283)
    })
})

describe('maximum no of likes', () => {

    
    test('favourite vlog', () => {
        const blogs = 
        [
        {
            "title": "Learn TypeScript in 30 Days", "likes": 600
        },
        {
            "title": "Understanding AI Ethics", "likes": 410
        },
        {
            "title": "Best Coffee Beans in 2025", "likes": 273
        }
        ]

        assert.deepStrictEqual(fns.favouriteBlogs(blogs).likes, blogs[0].likes )
    })
})