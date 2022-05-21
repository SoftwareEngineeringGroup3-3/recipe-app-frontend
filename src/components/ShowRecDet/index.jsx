import React from 'react'
import styles from './styles.css'
import { useContext, useState, useEffect } from 'react';
import { apiUrl } from '../../api';
import { useHistory } from 'react-router-dom';
import Posts from '../RecipesAdmin/Posts';
import Pagination from '../RecipesAdmin/Pagination'
import AddRecipe from '../AddRecipe';