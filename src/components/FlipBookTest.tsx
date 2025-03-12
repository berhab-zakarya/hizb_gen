/* eslint-disable */
"use client";

import React, { useRef, useState, useEffect, useCallback } from "react";
import HTMLFlipBook from "react-pageflip";
import LazyImage from "./LazyImage";
import {
  X,
  ChevronLeft,
  ChevronRight,
  Minimize,
  Maximize,
  Book,
} from "lucide-react";
import { ControlPanel } from "./quran/control-panel";
import { ThumnPanel } from "./quran/thumn-panel";
import AboutDialog from "./AboutDialog";

// Define proper types for the HTMLFlipBook component and its instance
interface PageFlip {
  flip: (pageIndex: number) => void;
  flipNext: () => void;
  flipPrev: () => void;
  turnToPage: (pageIndex: number) => void;
  getCurrentPageIndex: () => number;
  totalPages: number;
  getFlipType: () => string;
}

// Define interface for the HTMLFlipBook component's ref
interface HTMLFlipBookRef {
  pageFlip: () => PageFlip;
}

const images = Array.from(
  { length: 604 },
  (_, i) => `/images/__02.01.05.Masahif-Qira'at-Nafe_removed-${i + 1}.webp`
);

const hizbData = [
  { hizb: 1, startPage: 1 },
  { hizb: 2, startPage: 11 },
  { hizb: 3, startPage: 22 },
  { hizb: 4, startPage: 32 },
  { hizb: 5, startPage: 42 },
  { hizb: 6, startPage: 51 },
  { hizb: 7, startPage: 62 },
  { hizb: 8, startPage: 71 },
  { hizb: 9, startPage: 82 },
  { hizb: 10, startPage: 92 },
  { hizb: 11, startPage: 102 },
  { hizb: 12, startPage: 111 },
  { hizb: 13, startPage: 121 },
  { hizb: 14, startPage: 132 },
  { hizb: 15, startPage: 142 },
  { hizb: 16, startPage: 151 },
  { hizb: 17, startPage: 162 },
  { hizb: 18, startPage: 173 },
  { hizb: 19, startPage: 182 },
  { hizb: 20, startPage: 192 },
  { hizb: 21, startPage: 201 },
  { hizb: 22, startPage: 212 },
  { hizb: 23, startPage: 222 },
  { hizb: 24, startPage: 231 },
  { hizb: 25, startPage: 242 },
  { hizb: 26, startPage: 252 },
  { hizb: 27, startPage: 262 },
  { hizb: 28, startPage: 272 },
  { hizb: 29, startPage: 282 },
  { hizb: 30, startPage: 292 },
  { hizb: 31, startPage: 302 },
  { hizb: 32, startPage: 312 },
  { hizb: 33, startPage: 322 },
  { hizb: 34, startPage: 332 },
  { hizb: 35, startPage: 342 },
  { hizb: 36, startPage: 352 },
  { hizb: 37, startPage: 362 },
  { hizb: 38, startPage: 371 },
  { hizb: 39, startPage: 382 },
  { hizb: 40, startPage: 392 },
  { hizb: 41, startPage: 402 },
  { hizb: 42, startPage: 413 },
  { hizb: 43, startPage: 422 },
  { hizb: 44, startPage: 431 },
  { hizb: 45, startPage: 442 },
  { hizb: 46, startPage: 451 },
  { hizb: 47, startPage: 462 },
  { hizb: 48, startPage: 472 },
  { hizb: 49, startPage: 482 },
  { hizb: 50, startPage: 491 },
  { hizb: 51, startPage: 502 },
  { hizb: 52, startPage: 513 },
  { hizb: 53, startPage: 522 },
  { hizb: 54, startPage: 531 },
  { hizb: 55, startPage: 542 },
  { hizb: 56, startPage: 553 },
  { hizb: 57, startPage: 562 },
  { hizb: 58, startPage: 572 },
  { hizb: 59, startPage: 582 },
  { hizb: 60, startPage: 591 },
];

const thumnData = [
  { thumn: 1, startPage: 1 },
  { thumn: 2, startPage: 4 },
  { thumn: 3, startPage: 5 },
  { thumn: 4, startPage: 6 },
  { thumn: 5, startPage: 7 },
  { thumn: 6, startPage: 8 },
  { thumn: 7, startPage: 9 },
  { thumn: 8, startPage: 10 },
  { thumn: 9, startPage: 11 },
  { thumn: 10, startPage: 13 },
  { thumn: 11, startPage: 14 },
  { thumn: 12, startPage: 15 },
  { thumn: 13, startPage: 16 },
  { thumn: 14, startPage: 18 },
  { thumn: 15, startPage: 19 },
  { thumn: 16, startPage: 20 },
  { thumn: 17, startPage: 21 },
  { thumn: 18, startPage: 23 },
  { thumn: 19, startPage: 24 },
  { thumn: 20, startPage: 25 },
  { thumn: 21, startPage: 26 },
  { thumn: 22, startPage: 28 },
  { thumn: 23, startPage: 29 },
  { thumn: 24, startPage: 30 },
  { thumn: 25, startPage: 31 },
  { thumn: 26, startPage: 32 },
  { thumn: 27, startPage: 33 },
  { thumn: 28, startPage: 34 },
  { thumn: 29, startPage: 36 },
  { thumn: 30, startPage: 37 },
  { thumn: 31, startPage: 39 },
  { thumn: 32, startPage: 40 },
  { thumn: 33, startPage: 41 },
  { thumn: 34, startPage: 43 },
  { thumn: 35, startPage: 44 },
  { thumn: 36, startPage: 45 },
  { thumn: 37, startPage: 46 },
  { thumn: 38, startPage: 47 },
  { thumn: 39, startPage: 48 },
  { thumn: 40, startPage: 50 },
  { thumn: 41, startPage: 51 },
  { thumn: 42, startPage: 52 },
  { thumn: 43, startPage: 54 },
  { thumn: 44, startPage: 55 },
  { thumn: 45, startPage: 56 },
  { thumn: 46, startPage: 58 },
  { thumn: 47, startPage: 59 },
  { thumn: 48, startPage: 60 },
  { thumn: 49, startPage: 61 },
  { thumn: 50, startPage: 63 },
  { thumn: 51, startPage: 64 },
  { thumn: 52, startPage: 65 },
  { thumn: 53, startPage: 66 },
  { thumn: 54, startPage: 68 },
  { thumn: 55, startPage: 69 },
  { thumn: 56, startPage: 71 },
  { thumn: 57, startPage: 72 },
  { thumn: 58, startPage: 73 },
  { thumn: 59, startPage: 74 },
  { thumn: 60, startPage: 76 },
  { thumn: 61, startPage: 77 },
  { thumn: 62, startPage: 78 },
  { thumn: 63, startPage: 79 },
  { thumn: 64, startPage: 80 },
  { thumn: 65, startPage: 81 },
  { thumn: 66, startPage: 83 },
  { thumn: 67, startPage: 84 },
  { thumn: 68, startPage: 86 },
  { thumn: 69, startPage: 87 },
  { thumn: 70, startPage: 88 },
  { thumn: 71, startPage: 89 },
  { thumn: 72, startPage: 90 },
  { thumn: 73, startPage: 91 },
  { thumn: 74, startPage: 93 },
  { thumn: 75, startPage: 94 },
  { thumn: 76, startPage: 95 },
  { thumn: 77, startPage: 96 },
  { thumn: 78, startPage: 98 },
  { thumn: 79, startPage: 99 },
  { thumn: 80, startPage: 100 },
  { thumn: 81, startPage: 101 },
  { thumn: 82, startPage: 103 },
  { thumn: 83, startPage: 104 },
  { thumn: 84, startPage: 105 },
  { thumn: 85, startPage: 106 },
  { thumn: 86, startPage: 107 },
  { thumn: 87, startPage: 109 },
  { thumn: 88, startPage: 110 },
  { thumn: 89, startPage: 111 },
  { thumn: 90, startPage: 113 },
  { thumn: 91, startPage: 114 },
  { thumn: 92, startPage: 115 },
  { thumn: 93, startPage: 116 },
  { thumn: 94, startPage: 117 },
  { thumn: 95, startPage: 119 },
  { thumn: 96, startPage: 120 },
  { thumn: 97, startPage: 121 },
  { thumn: 98, startPage: 122 },
  { thumn: 99, startPage: 124 },
  { thumn: 100, startPage: 125 },
  { thumn: 101, startPage: 126 },
  { thumn: 102, startPage: 127 },
  { thumn: 103, startPage: 129 },
  { thumn: 104, startPage: 130 },
  { thumn: 105, startPage: 131 },
  { thumn: 106, startPage: 133 },
  { thumn: 107, startPage: 134 },
  { thumn: 108, startPage: 136 },
  { thumn: 109, startPage: 137 },
  { thumn: 110, startPage: 138 },
  { thumn: 111, startPage: 139 },
  { thumn: 112, startPage: 141 },
  { thumn: 113, startPage: 142 },
  { thumn: 114, startPage: 143 },
  { thumn: 115, startPage: 144 },
  { thumn: 116, startPage: 145 },
  { thumn: 117, startPage: 146 },
  { thumn: 118, startPage: 147 },
  { thumn: 119, startPage: 148 },
  { thumn: 120, startPage: 149 },
  { thumn: 121, startPage: 151 },
  { thumn: 122, startPage: 152 },
  { thumn: 123, startPage: 154 },
  { thumn: 124, startPage: 155 },
  { thumn: 125, startPage: 156 },
  { thumn: 126, startPage: 157 },
  { thumn: 127, startPage: 159 },
  { thumn: 128, startPage: 160 },
  { thumn: 129, startPage: 161 },
  { thumn: 130, startPage: 163 },
  { thumn: 131, startPage: 164 },
  { thumn: 132, startPage: 166 },
  { thumn: 133, startPage: 167 },
  { thumn: 134, startPage: 168 },
  { thumn: 135, startPage: 169 },
  { thumn: 136, startPage: 171 },
  { thumn: 137, startPage: 172 },
  { thumn: 138, startPage: 173 },
  { thumn: 139, startPage: 174 },
  { thumn: 140, startPage: 176 },
  { thumn: 141, startPage: 177 },
  { thumn: 142, startPage: 178 },
  { thumn: 143, startPage: 179 },
  { thumn: 144, startPage: 180 },
  { thumn: 145, startPage: 181 },
  { thumn: 146, startPage: 183 },
  { thumn: 147, startPage: 184 },
  { thumn: 148, startPage: 186 },
  { thumn: 149, startPage: 187 },
  { thumn: 150, startPage: 188 },
  { thumn: 151, startPage: 189 },
  { thumn: 152, startPage: 191 },
  { thumn: 153, startPage: 192 },
  { thumn: 154, startPage: 193 },
  { thumn: 155, startPage: 194 },
  { thumn: 156, startPage: 195 },
  { thumn: 157, startPage: 196 },
  { thumn: 158, startPage: 198 },
  { thumn: 159, startPage: 199 },
  { thumn: 160, startPage: 200 },
  { thumn: 161, startPage: 201 },
  { thumn: 162, startPage: 203 },
  { thumn: 163, startPage: 204 },
  { thumn: 164, startPage: 205 },
  { thumn: 165, startPage: 206 },
  { thumn: 166, startPage: 208 },
  { thumn: 167, startPage: 209 },
  { thumn: 168, startPage: 210 },
  { thumn: 169, startPage: 211 },
  { thumn: 170, startPage: 213 },
  { thumn: 171, startPage: 214 },
  { thumn: 172, startPage: 215 },
  { thumn: 173, startPage: 216 },
  { thumn: 174, startPage: 218 },
  { thumn: 175, startPage: 219 },
  { thumn: 176, startPage: 220 },
  { thumn: 177, startPage: 221 },
  { thumn: 178, startPage: 223 },
  { thumn: 179, startPage: 224 },
  { thumn: 180, startPage: 225 },
  { thumn: 181, startPage: 226 },
  { thumn: 182, startPage: 227 },
  { thumn: 183, startPage: 228 },
  { thumn: 184, startPage: 230 },
  { thumn: 185, startPage: 231 },
  { thumn: 186, startPage: 232 },
  { thumn: 187, startPage: 233 },
  { thumn: 188, startPage: 234 },
  { thumn: 189, startPage: 236 },
  { thumn: 190, startPage: 237 },
  { thumn: 191, startPage: 239 },
  { thumn: 192, startPage: 240 },
  { thumn: 193, startPage: 241 },
  { thumn: 194, startPage: 243 },
  { thumn: 195, startPage: 244 },
  { thumn: 196, startPage: 246 },
  { thumn: 197, startPage: 247 },
  { thumn: 198, startPage: 248 },
  { thumn: 199, startPage: 249 },
  { thumn: 200, startPage: 250 }, // im  here
  { thumn: 201, startPage: 252 },
  { thumn: 202, startPage: 253 },
  { thumn: 203, startPage: 254 },
  { thumn: 204, startPage: 255 },
  { thumn: 205, startPage: 256 },
  { thumn: 206, startPage: 257 },
  { thumn: 207, startPage: 259 },
  { thumn: 208, startPage: 260 },
  { thumn: 209, startPage: 262 },
  { thumn: 210, startPage: 263 },
  { thumn: 211, startPage: 264 },
  { thumn: 212, startPage: 266 },
  { thumn: 213, startPage: 267 },
  { thumn: 214, startPage: 268 },
  { thumn: 215, startPage: 270 },
  { thumn: 216, startPage: 271 },
  { thumn: 217, startPage: 272 },
  { thumn: 218, startPage: 273 },
  { thumn: 219, startPage: 274 },
  { thumn: 220, startPage: 275 },
  { thumn: 221, startPage: 277 },
  { thumn: 222, startPage: 278 },
  { thumn: 223, startPage: 279 },
  { thumn: 224, startPage: 281 },
  { thumn: 225, startPage: 282 },
  { thumn: 226, startPage: 283 },
  { thumn: 227, startPage: 284 },
  { thumn: 228, startPage: 285 },
  { thumn: 229, startPage: 286 },
  { thumn: 230, startPage: 288 },
  { thumn: 231, startPage: 289 },
  { thumn: 232, startPage: 290 },
  { thumn: 233, startPage: 292 },
  { thumn: 234, startPage: 293 },
  { thumn: 235, startPage: 295 },
  { thumn: 236, startPage: 296 },
  { thumn: 237, startPage: 297 },
  { thumn: 238, startPage: 298 },
  { thumn: 239, startPage: 299 },
  { thumn: 240, startPage: 300 },
  { thumn: 241, startPage: 302 },
  { thumn: 242, startPage: 303 },
  { thumn: 243, startPage: 304 },
  { thumn: 244, startPage: 305 },
  { thumn: 245, startPage: 306 },
  { thumn: 246, startPage: 308 },
  { thumn: 247, startPage: 309 },
  { thumn: 248, startPage: 310 },
  { thumn: 249, startPage: 312 },
  { thumn: 250, startPage: 313 },
  { thumn: 251, startPage: 315 },
  { thumn: 252, startPage: 316 },
  { thumn: 253, startPage: 317 },
  { thumn: 254, startPage: 318 },
  { thumn: 255, startPage: 319 },
  { thumn: 256, startPage: 320 },
  { thumn: 257, startPage: 322 },
  { thumn: 258, startPage: 323 },
  { thumn: 259, startPage: 324 },
  { thumn: 260, startPage: 325 },
  { thumn: 261, startPage: 326 },
  { thumn: 262, startPage: 327 },
  { thumn: 263, startPage: 329 },
  { thumn: 264, startPage: 330 },
  { thumn: 265, startPage: 332 },
  { thumn: 266, startPage: 333 },
  { thumn: 267, startPage: 334 },
  { thumn: 268, startPage: 335 },
  { thumn: 269, startPage: 336 },
  { thumn: 270, startPage: 338 },
  { thumn: 271, startPage: 339 },
  { thumn: 272, startPage: 340 },
  { thumn: 273, startPage: 342 },
  { thumn: 274, startPage: 343 },
  { thumn: 275, startPage: 344 },
  { thumn: 276, startPage: 345 },
  { thumn: 277, startPage: 346 },
  { thumn: 278, startPage: 348 },
  { thumn: 279, startPage: 349 },
  { thumn: 280, startPage: 350 },
  { thumn: 281, startPage: 351 },
  { thumn: 282, startPage: 353 },
  { thumn: 283, startPage: 354 },
  { thumn: 284, startPage: 355 },
  { thumn: 285, startPage: 356 },
  { thumn: 286, startPage: 358 },
  { thumn: 287, startPage: 359 },
  { thumn: 288, startPage: 360 },
  { thumn: 289, startPage: 361 },
  { thumn: 290, startPage: 363 },
  { thumn: 291, startPage: 364 },
  { thumn: 292, startPage: 365 },
  { thumn: 293, startPage: 366 },
  { thumn: 294, startPage: 368 },
  { thumn: 295, startPage: 369 },
  { thumn: 296, startPage: 370 },
  { thumn: 297, startPage: 371 },
  { thumn: 298, startPage: 373 },
  { thumn: 299, startPage: 374 },
  { thumn: 300, startPage: 376 },
  { thumn: 301, startPage: 377 },
  { thumn: 302, startPage: 378 },
  { thumn: 303, startPage: 379 },
  { thumn: 304, startPage: 380 },
  { thumn: 305, startPage: 381 },
  { thumn: 306, startPage: 383 },
  { thumn: 307, startPage: 384 },
  { thumn: 308, startPage: 385 },
  { thumn: 309, startPage: 386 },
  { thumn: 310, startPage: 387 },
  { thumn: 311, startPage: 388 },
  { thumn: 312, startPage: 390 },
  { thumn: 313, startPage: 391 },
  { thumn: 314, startPage: 393 },
  { thumn: 315, startPage: 394 },
  { thumn: 316, startPage: 395 },
  { thumn: 317, startPage: 397 },
  { thumn: 318, startPage: 398 },
  { thumn: 319, startPage: 399 },
  { thumn: 320, startPage: 400 },
  { thumn: 321, startPage: 401 },
  { thumn: 322, startPage: 403 },
  { thumn: 323, startPage: 405 },
  { thumn: 324, startPage: 406 },
  { thumn: 325, startPage: 407 },
  { thumn: 326, startPage: 408 },
  { thumn: 327, startPage: 410 },
  { thumn: 328, startPage: 411 },
  { thumn: 329, startPage: 413 },
  { thumn: 330, startPage: 414 },
  { thumn: 331, startPage: 415 },
  { thumn: 332, startPage: 416 },
  { thumn: 333, startPage: 417 },
  { thumn: 334, startPage: 419 },
  { thumn: 335, startPage: 420 },
  { thumn: 336, startPage: 421 },
  { thumn: 337, startPage: 422 },
  { thumn: 338, startPage: 423 },
  { thumn: 339, startPage: 424 },
  { thumn: 340, startPage: 425 },
  { thumn: 341, startPage: 426 },
  { thumn: 342, startPage: 428 },
  { thumn: 343, startPage: 429 },
  { thumn: 344, startPage: 430 },
  { thumn: 345, startPage: 431 },
  { thumn: 346, startPage: 432 },
  { thumn: 347, startPage: 433 },
  { thumn: 348, startPage: 435 },
  { thumn: 349, startPage: 436 },
  { thumn: 350, startPage: 437 },
  { thumn: 351, startPage: 439 },
  { thumn: 352, startPage: 440 },
  { thumn: 353, startPage: 441 },
  { thumn: 354, startPage: 443 },
  { thumn: 355, startPage: 444 },
  { thumn: 356, startPage: 445 },
  { thumn: 357, startPage: 446 },
  { thumn: 358, startPage: 447 },
  { thumn: 359, startPage: 449 },
  { thumn: 360, startPage: 450 },
  { thumn: 361, startPage: 451 },
  { thumn: 362, startPage: 452 },
  { thumn: 363, startPage: 454 },
  { thumn: 364, startPage: 455 },
  { thumn: 365, startPage: 456 },
  { thumn: 366, startPage: 457 },
  { thumn: 367, startPage: 459 },
  { thumn: 368, startPage: 460 },
  { thumn: 369, startPage: 461 },
  { thumn: 370, startPage: 463 },
  { thumn: 371, startPage: 464 },
  { thumn: 372, startPage: 465 },
  { thumn: 373, startPage: 467 },
  { thumn: 374, startPage: 468 },
  { thumn: 375, startPage: 469 },
  { thumn: 376, startPage: 470 },
  { thumn: 377, startPage: 471 },
  { thumn: 378, startPage: 473 },
  { thumn: 379, startPage: 474 },
  { thumn: 380, startPage: 476 },
  { thumn: 381, startPage: 477 },
  { thumn: 382, startPage: 478 },
  { thumn: 383, startPage: 479 },
  { thumn: 384, startPage: 480 },
  { thumn: 385, startPage: 481 },
  { thumn: 386, startPage: 483 },
  { thumn: 387, startPage: 484 },
  { thumn: 388, startPage: 485 },
  { thumn: 389, startPage: 486 },
  { thumn: 390, startPage: 487 },
  { thumn: 391, startPage: 488 },
  { thumn: 392, startPage: 489 },
  { thumn: 393, startPage: 491 },
  { thumn: 394, startPage: 492 },
  { thumn: 395, startPage: 494 },
  { thumn: 396, startPage: 495 },
  { thumn: 397, startPage: 497 },
  { thumn: 398, startPage: 498 },
  { thumn: 399, startPage: 499 },
  { thumn: 400, startPage: 501 },
  { thumn: 401, startPage: 502 },
  { thumn: 402, startPage: 503 }, // im here  now
  { thumn: 403, startPage: 504 },
  { thumn: 404, startPage: 506 },
  { thumn: 405, startPage: 507 },
  { thumn: 406, startPage: 508 },
  { thumn: 407, startPage: 510 },
  { thumn: 408, startPage: 511 },
  { thumn: 409, startPage: 513 },
  { thumn: 410, startPage: 514 },
  { thumn: 411, startPage: 515 },
  { thumn: 412, startPage: 516 },
  { thumn: 413, startPage: 517 },
  { thumn: 414, startPage: 518 },
  { thumn: 415, startPage: 519 },
  { thumn: 416, startPage: 520 },
  { thumn: 417, startPage: 521 },
  { thumn: 418, startPage: 523 },
  { thumn: 419, startPage: 524 },
  { thumn: 420, startPage: 525 },
  { thumn: 421, startPage: 526 },
  { thumn: 422, startPage: 528 },
  { thumn: 423, startPage: 529 },
  { thumn: 424, startPage: 530 },
  { thumn: 425, startPage: 531 },
  { thumn: 426, startPage: 532 },
  { thumn: 427, startPage: 534 },
  { thumn: 428, startPage: 535 },
  { thumn: 429, startPage: 536 },
  { thumn: 430, startPage: 538 },
  { thumn: 431, startPage: 539 },
  { thumn: 432, startPage: 540 },
  { thumn: 433, startPage: 541 },
  { thumn: 434, startPage: 543 },
  { thumn: 435, startPage: 544 },
  { thumn: 436, startPage: 545 },
  { thumn: 437, startPage: 547 },
  { thumn: 438, startPage: 548 },
  { thumn: 439, startPage: 550 },
  { thumn: 440, startPage: 551 },
  { thumn: 441, startPage: 552 },
  { thumn: 442, startPage: 554 },
  { thumn: 443, startPage: 555 },
  { thumn: 444, startPage: 556 },
  { thumn: 445, startPage: 557 },
  { thumn: 446, startPage: 559 },
  { thumn: 447, startPage: 560 },
  { thumn: 448, startPage: 561 },
  { thumn: 449, startPage: 562 },
  { thumn: 450, startPage: 563 },
  { thumn: 451, startPage: 565 },
  { thumn: 452, startPage: 566 },
  { thumn: 453, startPage: 567 },
  { thumn: 454, startPage: 568 },
  { thumn: 455, startPage: 569 },
  { thumn: 456, startPage: 571 },
  { thumn: 457, startPage: 572 },
  { thumn: 458, startPage: 573 },
  { thumn: 459, startPage: 574 },
  { thumn: 460, startPage: 576 },
  { thumn: 461, startPage: 577 },
  { thumn: 462, startPage: 578 },
  { thumn: 463, startPage: 579 },
  { thumn: 464, startPage: 580 },
  { thumn: 465, startPage: 581 },
  { thumn: 466, startPage: 583 },
  { thumn: 467, startPage: 584 },
  { thumn: 468, startPage: 586 },
  { thumn: 469, startPage: 587 },
  { thumn: 470, startPage: 588 },
  { thumn: 471, startPage: 589 },
  { thumn: 472, startPage: 590 },
  { thumn: 473, startPage: 591 },
  { thumn: 474, startPage: 592 },
  { thumn: 475, startPage: 594 },
  { thumn: 476, startPage: 595 },
  { thumn: 477, startPage: 596 },
  { thumn: 478, startPage: 598 },
  { thumn: 479, startPage: 599 },
  { thumn: 480, startPage: 601 },
];

const athmanData = [
  { name: "الأول", page: 1 },
  { name: "الثاني", page: 6 },
  { name: "الثالث", page: 11 },
  { name: "الرابع", page: 16 },
  { name: "الخامس", page: 21 },
  { name: "السادس", page: 26 },
  { name: "السابع", page: 31 },
  { name: "الثامن", page: 36 },
];

// Define props for HTMLFlipBook component
interface FlipBookProps {
  width: number;
  height: number;
  className?: string;
  showCover?: boolean;
  startPage?: number;
  // Add the direction prop explicitly
  direction?: "rtl" | "ltr";
  onFlip?: (e: any) => void;
  flippingTime?: number;
  usePortrait?: boolean;
  maxShadowOpacity?: number;
  children?: React.ReactNode;
}

const VISIBLE_PAGES = 4;
const PRELOAD_PAGES = 2;
const PRELOAD_WINDOW = 5;

const FlipBook = () => {
  // Use the properly typed ref
  const flipBookRef = useRef<HTMLFlipBookRef>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const bookContainerRef = useRef<HTMLDivElement>(null);
  const [pageNumber, setPageNumber] = useState<number>(1);
  const [selectedHizb, setSelectedHizb] = useState<number>(1);
  const [isFullScreen, setIsFullScreen] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const totalPages = images.length;
  const reversedImages = [...images].reverse();
  const [loadedImages, setLoadedImages] = useState<Set<string>>(new Set());
  const [visibleRange, setVisibleRange] = useState<[number, number]>([0, 10]);
  const [loadingStates, setLoadingStates] = useState<Record<number, boolean>>(
    {}
  );

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedThumn, setSelectedThumn] = useState<{
    name: string;
    page: number;
    hizb: string;
  } | null>(null);
  const [currentThumn, setCurrentThumn] = useState<number | null>(null);
  const [showThumnImage, setShowThumnImage] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState<string>("");
  const [customRange, setCustomRange] = useState({ min: 1, max: 60 });
  const [showThumnPanel, setShowThumnPanel] = useState(false);
  const [bookSize, setBookSize] = useState({ width: 400, height: 600 });
  const [zoomLevel, setZoomLevel] = useState(1.0); // Default zoom level is 1.0 (100%)
  const MIN_ZOOM = 0.5; // Minimum zoom level (50%)
  const MAX_ZOOM = 2.0; // Maximum zoom level (200%)
  const ZOOM_STEP = 0.1;

  const [showHizbMenu, setShowHizbMenu] = useState(false);
  const [showAbout, setShowAbout] = useState(false);

  const zoomIn = () => {
    if (zoomLevel < MAX_ZOOM) {
      setZoomLevel((prev) => Math.min(prev + ZOOM_STEP, MAX_ZOOM));
    }
  };

  const zoomOut = () => {
    if (zoomLevel > MIN_ZOOM) {
      setZoomLevel((prev) => Math.max(prev - ZOOM_STEP, MIN_ZOOM));
    }
  };

  const resetZoom = () => {
    setZoomLevel(1.0);
  };

  const toggleThumnPanel = () => {
    setShowThumnPanel(!showThumnPanel);
  };

  const getThumnPage = (thumnNumber: number) => {
    const thumn = thumnData.find((t) => t.thumn === thumnNumber);
    return thumn ? thumn.startPage : 1;
  };

  // دالة للانتقال إلى صفحة الثمن المختار
  const goToThumnPage = () => {
    if (currentThumn) {
      const thumn = thumnData.find((t) => t.thumn === currentThumn);
      if (thumn) {
        const targetPage = thumn.startPage;
        console.log("Going to thumn page:", targetPage);

        // Calculate the correct flip index
        const flipIndex = totalPages - targetPage;

        try {
          if (flipBookRef.current) {
            // Try the navigation
            flipBookRef.current.pageFlip().turnToPage(flipIndex);
            // Update the page number state
            setPageNumber(targetPage);
          }
        } catch (error) {
          console.error("Navigation failed:", error);
        }
      }
    }
  };

  // دالة لإنشاء اسم صورة الثمن
  const getThumnImageName = (thumnNumber: number) => {
    return thumnNumber.toString().padStart(3, "0"); // تحويل الرقم إلى تنسيق ثلاثي الأرقام
  };

  const handleCustomRangeSelect = () => {
    if (
      customRange.min > 0 &&
      customRange.max <= 60 &&
      customRange.min <= customRange.max
    ) {
      handleRandomSelection(customRange.min, customRange.max);
    }
  };

  const handleRandomSelection = (minHizb: number, maxHizb: number) => {
    setIsLoading(true);
    setShowThumnImage(false);
    setSelectedCategory(`${minHizb}-${maxHizb}`);

    setTimeout(() => {
      // Calculate thumn range based on hizb range
      const minThumn = (minHizb - 1) * 8 + 1;
      const maxThumn = maxHizb * 8;

      // Generate random thumn number within range
      const randomThumnNumber =
        Math.floor(Math.random() * (maxThumn - minThumn + 1)) + minThumn;

      // Find the thumn data
      const thumn = thumnData.find((t) => t.thumn === randomThumnNumber);

      if (thumn) {
        const hizbNumber = Math.ceil(randomThumnNumber / 8);
        const thumnInHizb = ((randomThumnNumber - 1) % 8) + 1;

        setSelectedThumn({
          name: thumnInHizb.toString(),
          page: thumn.startPage,
          hizb: hizbNumber.toString(),
        });
        setCurrentThumn(randomThumnNumber);
        setIsModalOpen(true);
      }

      setIsLoading(false);
    }, 700);
  };

  const preloadImages = (currentPage: number) => {
    const pagesToPreload = [];
    const preloadWindow = 2;

    for (let i = -preloadWindow; i <= preloadWindow; i++) {
      const pageToLoad = currentPage + i;
      if (pageToLoad >= 1 && pageToLoad <= totalPages) {
        const imgSrc = images[pageToLoad - 1];
        if (!loadedImages.has(imgSrc)) {
          pagesToPreload.push(imgSrc);
        }
      }
    }

    pagesToPreload.forEach((src) => {
      const img = new window.Image();
      img.onload = () => {
        setLoadedImages((prev) => new Set(prev).add(src));
      };
      img.src = src;
    });
  };

  // أضف هذا Effect
  useEffect(() => {
    preloadImages(pageNumber);
  }, [pageNumber]);

  useEffect(() => {
    const updateVisibleRange = () => {
      const start = Math.max(0, pageNumber - PRELOAD_WINDOW);
      const end = Math.min(totalPages - 1, pageNumber + PRELOAD_WINDOW);
      setVisibleRange([start, end]);
    };

    updateVisibleRange();
  }, [pageNumber, totalPages]);

  useEffect(() => {
    const handleKeyPress = (event: KeyboardEvent) => {
      if (event.key === "F11") {
        // تأخير قليل للسماح للمتصفح بإكمال عملية ملء الشاشة
        setTimeout(() => {
          const isFullscreenNow = !!document.fullscreenElement;
          if (!isFullscreenNow) {
            // إذا تم الخروج من وضع ملء الشاشة بواسطة F11
            setZoomLevel(1.0); // إعادة التكبير إلى 100%
          }
        }, 100);
      }
    };

    window.addEventListener("keydown", handleKeyPress);
    return () => window.removeEventListener("keydown", handleKeyPress);
  }, []);

  useEffect(() => {
    images.forEach((imgSrc) => {
      // تحقق إذا كانت الصورة قد تم تحميلها مسبقًا
      if (!loadedImages.has(imgSrc)) {
        const img = new window.Image();
        img.src = imgSrc;
        img.onload = () => {
          // أضف الصورة إلى Set
          setLoadedImages((prev) => new Set(prev).add(imgSrc));
        };
      }
    });
  }, [images, loadedImages]);

  useEffect(() => {
    // تحقق إذا تم تحميل جميع الصور
    if (loadedImages.size === images.length) {
      setIsLoading(false);
    }
  }, [loadedImages]);

  // تنقل بين الصفحات
  const goToPrevPage = () => flipBookRef.current?.pageFlip().flipNext();
  const goToNextPage = () => flipBookRef.current?.pageFlip().flipPrev();

  // الانتقال لصفحة محددة
  const goToPage = (page: number) => {
    if (page >= 1 && page <= totalPages) {
      setPageNumber(page);

      const flipToIndex = totalPages - page;
      flipBookRef.current?.pageFlip().flip(flipToIndex);
    }
  };

  const goToHizb = (hizbNumber: number) => {
    console.log(`goToHizb called with hizbNumber: ${hizbNumber}`);

    const hizb = hizbData.find((h) => h.hizb === hizbNumber);
    console.log(`Found hizb data:`, hizb);

    if (hizb) {
      setSelectedHizb(hizbNumber);
      const startPage = hizb.startPage;
      setPageNumber(startPage);

      const flipToIndex = totalPages - startPage;
      console.log(`Target flip index: ${flipToIndex}`);

      // Try the testNavigationMethods with the calculated index
      testNavigationMethods(flipToIndex);

      // Also try with the original safeFlip for comparison
      safeFlip(flipToIndex);
    }
  };

  // وضع ملء الشاشة
  const toggleFullScreen = () => {
    if (!document.fullscreenElement) {
      if (bookContainerRef.current?.requestFullscreen) {
        bookContainerRef.current
          .requestFullscreen()
          .then(() => {
            setIsFullScreen(true);
            setZoomLevel(1.4); // تعيين مستوى التكبير إلى 140%
          })
          .catch((err) =>
            console.error(
              `Error attempting to enable fullscreen: ${err.message}`
            )
          );
      }
    } else {
      if (document.exitFullscreen) {
        document
          .exitFullscreen()
          .then(() => {
            setIsFullScreen(false);
            setZoomLevel(1.0); // إعادة مستوى التكبير إلى 100% عند الخروج من وضع ملء الشاشة
          })
          .catch((err) =>
            console.error(`Error attempting to exit fullscreen: ${err.message}`)
          );
      }
    }
  };

  useEffect(() => {
    const updateBookSize = () => {
      if (containerRef.current) {
        if (isFullScreen) {
          // Get screen dimensions
          const screenWidth = window.innerWidth;
          const screenHeight = window.innerHeight;

          // Calculate book dimensions to fill most of the screen while maintaining aspect ratio
          const margin = 40; // margin from screen edges
          const availableHeight = screenHeight - margin * 2;
          const availableWidth = screenWidth - margin * 2;

          let width, height;
          const aspectRatio = 0.7; // typical book page ratio (width/height)

          if (screenWidth > screenHeight) {
            // Landscape mode
            height = availableHeight;
            width = height * aspectRatio * 2; // multiply by 2 for two pages

            // Check if width is too large
            if (width > availableWidth) {
              width = availableWidth;
              height = width / (aspectRatio * 2);
            }
          } else {
            // Portrait mode
            width = availableWidth;
            height = width / aspectRatio;

            // Check if height is too large
            if (height > availableHeight) {
              height = availableHeight;
              width = height * aspectRatio;
            }
          }

          console.log(
            `Fullscreen book size: {width: ${width}, height: ${height}}`
          );
          setBookSize({ width: width / 2, height }); // divide width by 2 for single page width
        } else {
          // Normal mode sizing
          const containerWidth = containerRef.current.clientWidth;
          const containerHeight = window.innerHeight * 0.8;

          const availableWidth = showThumnPanel
            ? containerWidth * 0.75
            : containerWidth * 0.9;

          const aspectRatio = 0.7;
          let width = Math.min(availableWidth / 2, 600);
          let height = width / aspectRatio;

          if (height > containerHeight) {
            height = containerHeight;
            width = height * aspectRatio;
          }

          console.log(`Normal book size: {width: ${width}, height: ${height}}`);
          setBookSize({ width, height });
        }
      }
    };

    // Run immediately
    updateBookSize();

    // Add a small delay for fullscreen transition
    if (isFullScreen) {
      const timer = setTimeout(updateBookSize, 100);
      return () => clearTimeout(timer);
    }

    // Update on resize
    window.addEventListener("resize", updateBookSize);
    return () => window.removeEventListener("resize", updateBookSize);
  }, [isFullScreen, showThumnPanel]);

  useEffect(() => {
    const handleFullscreenChange = () => {
      const isFullscreenNow = !!document.fullscreenElement;
      setIsFullScreen(isFullscreenNow);

      // تعيين مستوى التكبير بناءً على حالة ملء الشاشة
      if (isFullscreenNow) {
        setZoomLevel(1.4); // 140% في وضع ملء الشاشة
      } else {
        setZoomLevel(1.0); // 100% في الوضع العادي
      }
    };

    document.addEventListener("fullscreenchange", handleFullscreenChange);
    return () =>
      document.removeEventListener("fullscreenchange", handleFullscreenChange);
  }, []);

  const handlePageFlip = (e: any) => {
    console.log(`handlePageFlip called with full event:`, e);
    console.log(`e.data: ${e.data}, typeof e.data: ${typeof e.data}`);

    // Check if we have access to the current page from the event
    const currentPageFromEvent = e.data;
    const calculatedPage = totalPages - currentPageFromEvent + 1;

    console.log(`Current page from event: ${currentPageFromEvent}`);
    console.log(`Calculated page: ${calculatedPage}`);

    // Get the current page directly from the flipBook ref as a cross-check
    const currentPageFromRef = flipBookRef.current
      ?.pageFlip()
      .getCurrentPageIndex();
    console.log(`Current page from ref: ${currentPageFromRef}`);

    // Calculate what page number this should be
    const pageNumberFromRef = totalPages - (currentPageFromRef || 0) + 1;
    console.log(`Page number from ref: ${pageNumberFromRef}`);

    // Set the page number based on the ref (might be more reliable)
    setPageNumber(pageNumberFromRef);

    const start = Math.max(0, currentPageFromEvent - PRELOAD_WINDOW);
    const end = Math.min(totalPages - 1, currentPageFromEvent + PRELOAD_WINDOW);
    setVisibleRange([start, end]);
  };

  const handleImageLoad = (index: number) => {
    setLoadingStates((prev) => ({
      ...prev,
      [index]: true,
    }));
  };

  // Add this debugging function to test different navigation methods
  const testNavigationMethods = (targetIndex: number) => {
    console.log(`Testing navigation methods to index: ${targetIndex}`);

    if (flipBookRef.current) {
      const pageFlip = flipBookRef.current.pageFlip();

      // Try different methods based on what's available in the library
      console.log("Available methods:", Object.keys(pageFlip));

      try {
        console.log("Trying method: turnToPage");
        pageFlip.turnToPage(targetIndex);
      } catch (e) {
        console.error("turnToPage failed:", e);
      }
    }
  };

  const safeFlip = (index: number) => {
    console.log(`safeFlip called with index: ${index}`);

    // Ensure the index is an integer
    const safeIndex = Math.round(index);

    // Ensure it's within bounds
    const maxIndex = reversedImages.length - 1;
    const boundedIndex = Math.max(0, Math.min(safeIndex, maxIndex));
    console.log(`Attempting to turn to page index: ${boundedIndex}`);

    if (flipBookRef.current) {
      try {
        // Try turnToPage instead of flip
        flipBookRef.current.pageFlip().turnToPage(boundedIndex);
        return true;
      } catch (error) {
        console.error("Error during turnToPage operation:", error);

        // Fallback to the original flip method
        try {
          console.log(
            `Falling back to flip method with index: ${boundedIndex}`
          );
          flipBookRef.current.pageFlip().flip(boundedIndex);
          return true;
        } catch (flipError) {
          console.error("Error during fallback flip operation:", flipError);
          return false;
        }
      }
    }
    return false;
  };

  const directPageSet = (index: number) => {
    console.log(`Attempting direct page set to index: ${index}`);

    if (flipBookRef.current && flipBookRef.current.pageFlip()) {
      try {
        // Some implementations might allow this - worth a try
        const pageFlip = flipBookRef.current.pageFlip();
        if (typeof (pageFlip as any).currentPageIndex !== "undefined") {
          console.log("Trying to set currentPageIndex directly");
          (pageFlip as any).currentPageIndex = index;
          return true;
        }
      } catch (e) {
        console.error("Direct page set failed:", e);
      }
    }
    return false;
  };

  return (
    <div className="flipbook-container relative h-full overflow-hidden bg-[#F5E6CA]">
      {/* Title in the top center */}
      

      {isFullScreen && (
        <button
          className="fixed top-4 right-4 z-[9999] border p-2 rounded bg-white shadow-lg hover:bg-gray-100"
          onClick={() => {
            if (document.exitFullscreen) {
              document
                .exitFullscreen()
                .then(() => {
                  setIsFullScreen(false)
                  setZoomLevel(1.0)
                })
                .catch((err) => console.error(err))
            }
          }}
          title="خروج من وضع ملء الشاشة"
        >
          <Minimize className="h-5 w-5" />
        </button>
      )}

      <div className="flex w-full h-full justify-center items-center">
        {" "}
        {/* Added margin to accommodate the title */}
        <div className="flex-1 w-full justify-center flex flex-col h-full">
          {/* شريط الأدوات - تم تعديله ليكون في المنتصف */}
          <div className="flex justify-center w-full mb-2">
            <div className="toolbar bg-[#F8F0E3] border-2 border-[#D4AF37] p-2 flex flex-wrap justify-center items-center gap-2 rounded-lg mx-2 shadow-md">
              <div className="flex items-center gap-2 mr-4">
                <button
                  className="border-2 border-[#D4AF37] text-[#8B4513] hover:bg-[#D4AF37] hover:text-white p-2 rounded font-bold"
                  onClick={goToPrevPage}
                  disabled={pageNumber <= 1}
                >
                  <ChevronLeft className="h-4 w-4" />
                </button>

                <div className="flex items-center gap-2">
                  <input
                    type="number"
                    min={1}
                    max={totalPages}
                    value={pageNumber}
                    onChange={(e) => {
                      const page = Number.parseInt(e.target.value)
                      if (page >= 1 && page <= totalPages) {
                        goToPage(page)
                      }
                    }}
                    className="w-16 h-8 text-center border-2 rounded border-[#D4AF37] bg-white text-[#8B4513] hover:bg-white font-bold"
                  />
                  <span className="text-sm text-[#8B4513] font-bold">من {totalPages}</span>
                </div>

                <button
                  className="border-2 border-[#D4AF37] text-[#8B4513] hover:bg-[#D4AF37] hover:text-white p-2 rounded font-bold"
                  onClick={goToNextPage}
                  disabled={pageNumber >= totalPages}
                >
                  <ChevronRight className="h-4 w-4" />
                </button>
              </div>

              <div className="flex items-center gap-2">
                <button
                  className="border-2 p-2 rounded border-[#D4AF37] text-[#8B4513] hover:bg-[#D4AF37] hover:text-white font-bold"
                  onClick={toggleFullScreen}
                  title={isFullScreen ? "إنهاء ملء الشاشة" : "ملء الشاشة"}
                >
                  {isFullScreen ? <Minimize className="h-4 w-4" /> : <Maximize className="h-4 w-4" />}
                </button>

                <button
                  className="border-2 p-2 rounded border-[#D4AF37] text-[#8B4513] hover:bg-[#D4AF37] hover:text-white font-bold"
                  onClick={zoomOut}
                  disabled={zoomLevel <= MIN_ZOOM}
                  title="تصغير"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="16"
                    height="16"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <circle cx="11" cy="11" r="8" />
                    <line x1="21" y1="21" x2="16.65" y2="16.65" />
                    <line x1="8" y1="11" x2="14" y2="11" />
                  </svg>
                </button>

                <span className="text-sm text-[#8B4513] font-bold">{Math.round(zoomLevel * 100)}%</span>

                <button
                  className="border-2 p-2 rounded border-[#D4AF37] text-[#8B4513] hover:bg-[#D4AF37] hover:text-white font-bold"
                  onClick={zoomIn}
                  disabled={zoomLevel >= MAX_ZOOM}
                  title="تكبير"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="16"
                    height="16"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <circle cx="11" cy="11" r="8" />
                    <line x1="21" y1="21" x2="16.65" y2="16.65" />
                    <line x1="11" y1="8" x2="11" y2="14" />
                    <line x1="8" y1="11" x2="14" y2="11" />
                  </svg>
                </button>

                <button
                  className="border-2 p-2 rounded border-[#D4AF37] text-[#8B4513] hover:bg-[#D4AF37] hover:text-white font-bold"
                  onClick={resetZoom}
                  title="إعادة تعيين التكبير"
                >
                  <span className="text-xs font-bold">100%</span>
                </button>

                <button
                  className="border-2 p-2 rounded border-[#D4AF37] text-[#8B4513] hover:bg-[#D4AF37] hover:text-white font-bold"
                  onClick={toggleThumnPanel}
                  title="لوحة الأثمان"
                >
                  <Book className="h-4 w-4" />
                </button>

                <div className="relative">
                  <button
                    className="border-2 p-2 rounded border-[#D4AF37] text-[#8B4513] hover:bg-[#D4AF37] hover:text-white font-bold"
                    onClick={() => setShowHizbMenu(!showHizbMenu)}
                    title="اختيار حزب"
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      className="h-4 w-4"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253"
                      />
                    </svg>
                  </button>

                  {showHizbMenu && (
                    <div className="absolute top-full right-0 mt-1 bg-white border-2 border-[#D4AF37] rounded-lg shadow-lg z-50 max-h-[300px] overflow-y-auto w-64">
                      <div className="p-2 bg-[#D4AF37] border-b-2 border-[#8B4513] rounded-t-lg">
                        <h3 className="text-center text-white font-bold text-lg">اختيار الحزب</h3>
                      </div>
                      <div className="grid grid-cols-2 gap-1 p-2">
                        {hizbData.map((hizb) => (
                          <button
                            key={hizb.hizb}
                            className="text-right px-3 py-2 hover:bg-[#F8F0E3] rounded-md text-[#8B4513] border-2 border-[#F8F0E3] hover:border-[#D4AF37] transition-colors font-bold"
                            onClick={() => {
                              goToHizb(hizb.hizb)
                              setShowHizbMenu(false)
                            }}
                          >
                            <span className="font-bold">{hizb.hizb}</span>
                            <span className="text-xs block text-[#8B4513]">صفحة {hizb.startPage}</span>
                          </button>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
                <button
                  className="border-2 p-2 rounded border-[#D4AF37] text-[#8B4513] hover:bg-[#D4AF37] hover:text-white font-bold"
                  onClick={() => setShowAbout(true)}
                  title="حول البرنامج"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="16"
                    height="16"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <circle cx="12" cy="12" r="10" />
                    <path d="M12 16v-4" />
                    <path d="M12 8h.01" />
                  </svg>
                </button>
              </div>
            </div>
          </div>

          {/* حاوية الكتاب مع التكبير */}
          <div className="flex-1 overflow-hidden w-full">
            <div
              ref={bookContainerRef}
              className={
                isFullScreen
                  ? "fixed inset-0 z-50 bg-[#F5E6CA] flex justify-center items-center"
                  : "w-full h-full flex justify-center items-center p-4"
              }
            >
              {/* حاوية التكبير */}
              <div
                style={{
                  transform: `scale(${zoomLevel})`,
                  transformOrigin: "center center",
                  transition: "transform 0.3s ease",
                  height: "100%",
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                }}
              >
                <HTMLFlipBook
                  ref={flipBookRef}
                  width={bookSize.width}
                  height={bookSize.height}
                  className="quran-flipbook shadow-lg"
                  showCover={true}
                  startPage={images.length - 1}
                  onFlip={handlePageFlip}
                  flippingTime={500}
                  usePortrait={false}
                  maxShadowOpacity={0.5}
                  style={{
                    margin: 0,
                    transition: "width 0.3s, height 0.3s",
                  }}
                  size="fixed"
                  minWidth={0}
                  maxWidth={0}
                  minHeight={0}
                  maxHeight={0}
                  drawShadow={false}
                  startZIndex={0}
                  autoSize={false}
                  mobileScrollSupport={true}
                  clickEventForward={false}
                  useMouseEvents={true}
                  swipeDistance={0}
                  showPageCorners={false}
                  disableFlipByClick={true}
                >
                  {reversedImages.map((image, index) => {
                    const actualPageNumber = totalPages - index
                    const isNearCurrent = Math.abs(index - (totalPages - pageNumber)) <= VISIBLE_PAGES
                    const shouldPreload = Math.abs(index - (totalPages - pageNumber)) <= PRELOAD_PAGES

                    if (!isNearCurrent && !shouldPreload) {
                      return <div key={index} className="quran-page bg-cream" data-page-number={actualPageNumber} />
                    }

                    return (
                      <div key={index} className="quran-page bg-cream" data-page-number={actualPageNumber}>
                        <LazyImage
                          src={image}
                          alt={`صفحة ${actualPageNumber}`}
                          width={bookSize.width}
                          height={bookSize.height}
                          style={{
                            width: "100%",
                            height: "100%",
                            objectFit: "contain",
                          }}
                          priority={shouldPreload}
                          onLoad={() => handleImageLoad(index)}
                        />
                      </div>
                    )
                  })}
                </HTMLFlipBook>
              </div>
            </div>
          </div>
        </div>
        {showThumnPanel && (
          <div className="fixed top-[72px] right-4 z-50 bg-white border-2 border-[#D4AF37] rounded-xl shadow-lg p-4 w-80">
            <ThumnPanel
              selectedThumn={selectedThumn}
              currentThumn={currentThumn}
              showThumnImage={showThumnImage}
              setShowThumnImage={setShowThumnImage}
              selectedCategory={selectedCategory}
              customRange={customRange}
              setCustomRange={setCustomRange}
              handleRandomSelection={handleRandomSelection}
              handleCustomRangeSelect={handleCustomRangeSelect}
              goToThumnPage={goToThumnPage}
              getThumnImageName={getThumnImageName}
              onClose={() => setShowThumnPanel(false)}
            />
          </div>
        )}
      </div>
      <AboutDialog isOpen={showAbout} onClose={() => setShowAbout(false)} />
    </div>
  )
};

export default FlipBook;
