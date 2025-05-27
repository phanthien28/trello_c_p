import {Given, When, Then} from '@cucumber/cucumber';
import {expect, Page} from '@playwright/test';
import { BoardPage } from '../pages/selectors/BoardPageSelectors';

let boardPage: BoardPage;

