import { Router, Request, Response } from 'express';
import { FeedItem } from '../models/FeedItem';
import { NextFunction } from 'connect';
import * as jwt from 'jsonwebtoken';
import * as AWS from '../../../../aws';
import * as c from '../../../../config/config';

const router: Router = Router();

export function requireAuth(req: Request, res: Response, next: NextFunction) {
  if (!req.headers || !req.headers.authorization) {
    return res.status(401).send({ message: 'No authorization headers.' });
  }

  const tokenBearer = req.headers.authorization.split(' ');
  if (tokenBearer.length != 2) {
    return res.status(401).send({ message: 'Malformed token.' });
  }

  const token = tokenBearer[1];
  return jwt.verify(token, c.config.jwt.secret, (err, decoded) => {
    if (err) {
      return res.status(500).send({ auth: false, message: 'Failed to authenticate.' });
    }
    return next();
  });
}

export function checkOption(req: Request, res: Response, next: NextFunction) {
  if (req.method == "OPTIONS") {
    res.status(200);
    res.send();
  } else {
    next();
  }
}

// Get all feed items
router.get('/', async (req: Request, res: Response) => {
  let items = await FeedItem.findAndCountAll({ order: [['id', 'DESC']] });
  let _items: Array<FeedItem> = [];

  for (let i = 0; i < items.rows.length; i++) {
    let item = items.rows[i];
    _items.push(item);
    if (_items[i].url) {
      _items[i].url = await AWS.getGetSignedUrl(_items[i].url);
    }
  }

  res.send({ count: items.count, rows: _items });
});

// Get a feed resource
router.get('/:id',
  checkOption,
  async (req: Request, res: Response) => {
    const { id } = req.params;
    const item = await FeedItem.findByPk(id);
    res.send(item);
  });

// Get a signed url to put a new item in the bucket
router.get('/signed-url/:fileName',
  requireAuth,
  checkOption,
  async (req: Request, res: Response) => {
    const { fileName } = req.params;
    const url: string = await AWS.getPutSignedUrl(fileName);
    res.status(201).send({ url: url });
  });

// Create feed with metadata
router.post('/',
  requireAuth,
  checkOption,
  async (req: Request, res: Response) => {
    const caption = req.body.caption;
    const fileName = req.body.url; // same as S3 key name

    if (!caption) {
      return res.status(400).send({ message: 'Caption is required or malformed.' });
    }

    if (!fileName) {
      return res.status(400).send({ message: 'File url is required.' });
    }

    const item: FeedItem = FeedItem.build({
      caption: caption,
      url: fileName,
    });

    const savedItem = await item.save();

    savedItem.url = await AWS.getGetSignedUrl(savedItem.url);
    res.status(201).send(savedItem);
  });

export const FeedRouter: Router = router;
