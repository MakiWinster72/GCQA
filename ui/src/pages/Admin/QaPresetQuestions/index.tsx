/*
 * Licensed to the Apache Software Foundation (ASF) under one
 * or more contributor license agreements.  See the NOTICE file
 * distributed with this work for additional information
 * regarding copyright ownership.  The ASF licenses this file
 * to you under the Apache License, Version 2.0 (the
 * "License"); you may not use this file except in compliance
 * with the License.  You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing,
 * software distributed under the License is distributed on an
 * "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY
 * KIND, either express or implied.  See the License for the
 * specific language governing permissions and limitations
 * under the License.
 */

import { useEffect, useMemo, useState } from 'react';
import { Button, Form } from 'react-bootstrap';
import { useTranslation } from 'react-i18next';

import type * as Type from '@/common/interface';
import { writeSettingStore } from '@/stores';
import {
  getQuestionSetting,
  updateQuestionSetting,
} from '@/services/admin/question';
import { useToast } from '@/hooks';

const QaPresetQuestions = () => {
  const { t } = useTranslation('translation', {
    keyPrefix: 'admin.questions.preset_questions',
  });
  const Toast = useToast();
  const [items, setItems] = useState<Type.AskCheckConfig[]>([]);
  const [optionsText, setOptionsText] = useState<Record<string, string>>({});
  const [setting, setSetting] = useState<Type.AdminQuestionSetting>({
    min_tags: 0,
    min_content: 0,
    restrict_answer: false,
    ask_checks: [],
  });

  const typeOptions = useMemo(
    () => [
      { value: 'select', label: t('type_select') },
      { value: 'multi', label: t('type_multi') },
      { value: 'text', label: t('type_text') },
    ],
    [t],
  );

  const createId = () =>
    `${Date.now().toString(36)}${Math.random().toString(36).slice(2, 8)}`;

  const updateItem = (id: string, patch: Partial<Type.AskCheckConfig>) => {
    setItems((prev) =>
      prev.map((item) => (item.id === id ? { ...item, ...patch } : item)),
    );
  };

  const removeItem = (id: string) => {
    setItems((prev) => prev.filter((item) => item.id !== id));
    setOptionsText((prev) => {
      const next = { ...prev };
      delete next[id];
      return next;
    });
  };

  const addItem = () => {
    const id = createId();
    setItems((prev) => [
      ...prev,
      {
        id,
        title: '',
        type: 'select',
        required: true,
        options: [],
      },
    ]);
    setOptionsText((prev) => ({ ...prev, [id]: '' }));
  };

  const normalizeItems = (list: Type.AskCheckConfig[]) =>
    list
      .map((item) => {
        const title = item.title?.trim();
        if (!title) {
          return null;
        }
        const options = (item.options || [])
          .map((opt) => opt.trim())
          .filter(Boolean);
        if (
          (item.type === 'select' || item.type === 'multi') &&
          options.length === 0
        ) {
          return null;
        }
        return {
          ...item,
          title,
          options,
        } as Type.AskCheckConfig;
      })
      .filter(Boolean) as Type.AskCheckConfig[];

  const onSubmit = (evt) => {
    evt.preventDefault();
    evt.stopPropagation();
    const cleaned = normalizeItems(items);
    if (items.length > 0 && cleaned.length === 0) {
      Toast.onShow({
        msg: t('validation_error'),
        variant: 'danger',
      });
      return;
    }
    const reqParams: Type.AdminQuestionSetting = {
      min_tags: setting.min_tags,
      min_content: setting.min_content,
      restrict_answer: setting.restrict_answer,
      ask_checks: cleaned,
    };
    updateQuestionSetting(reqParams)
      .then(() => {
        Toast.onShow({
          msg: t('update', { keyPrefix: 'toast' }),
          variant: 'success',
        });
        writeSettingStore.getState().update({ ...reqParams });
        setItems(cleaned);
      })
      .catch(() => {
        Toast.onShow({
          msg: t('validation_error'),
          variant: 'danger',
        });
      });
  };

  useEffect(() => {
    getQuestionSetting().then((res) => {
      if (!res) {
        return;
      }
      setSetting(res);
      setItems(res.ask_checks || []);
      setOptionsText(
        (res.ask_checks || []).reduce<Record<string, string>>((acc, item) => {
          acc[item.id] = (item.options || []).join('\n');
          return acc;
        }, {}),
      );
    });
  }, []);

  return (
    <>
      <h3 className="mb-4">{t('page_title')}</h3>
      <div className="max-w-748">
        <Form onSubmit={onSubmit}>
          {items.map((item, index) => (
            <div className="border rounded p-3 mb-3" key={item.id}>
              <div className="d-flex justify-content-between align-items-center mb-2">
                <div className="fw-semibold">
                  {t('question_label')} #{index + 1}
                </div>
                <Button
                  variant="link"
                  className="p-0"
                  type="button"
                  onClick={() => removeItem(item.id)}>
                  {t('remove')}
                </Button>
              </div>
              <Form.Group
                className="mb-3"
                controlId={`ask-check-title-${item.id}`}>
                <Form.Label>{t('question_label')}</Form.Label>
                <Form.Control
                  value={item.title}
                  onChange={(e) =>
                    updateItem(item.id, { title: e.target.value })
                  }
                />
              </Form.Group>
              <div className="d-flex flex-wrap gap-3">
                <Form.Group
                  className="flex-grow-1"
                  controlId={`ask-check-type-${item.id}`}>
                  <Form.Label>{t('type_label')}</Form.Label>
                  <Form.Select
                    value={item.type}
                    onChange={(e) =>
                      updateItem(item.id, {
                        type: e.target.value as Type.AskCheckType,
                      })
                    }>
                    {typeOptions.map((opt) => (
                      <option key={opt.value} value={opt.value}>
                        {opt.label}
                      </option>
                    ))}
                  </Form.Select>
                </Form.Group>
                <Form.Group controlId={`ask-check-required-${item.id}`}>
                  <Form.Label>{t('required_label')}</Form.Label>
                  <div>
                    <Form.Check
                      type="switch"
                      checked={item.required}
                      onChange={(e) =>
                        updateItem(item.id, { required: e.target.checked })
                      }
                      label={t('required_label')}
                    />
                  </div>
                </Form.Group>
              </div>
              {(item.type === 'select' || item.type === 'multi') && (
                <Form.Group
                  className="mt-3"
                  controlId={`ask-check-options-${item.id}`}>
                  <Form.Label>{t('options_label')}</Form.Label>
                  <Form.Control
                    as="textarea"
                    rows={3}
                    value={optionsText[item.id] || ''}
                    placeholder={t('options_hint')}
                    onChange={(e) => {
                      const raw = e.target.value;
                      setOptionsText((prev) => ({ ...prev, [item.id]: raw }));
                      updateItem(item.id, {
                        options: raw
                          .split('\n')
                          .map((opt) => opt.trim())
                          .filter(Boolean),
                      });
                    }}
                  />
                </Form.Group>
              )}
            </div>
          ))}
          <div className="d-flex gap-2">
            <Button variant="outline-secondary" onClick={addItem} type="button">
              {t('add')}
            </Button>
            <Button type="submit">{t('save')}</Button>
          </div>
        </Form>
      </div>
    </>
  );
};

export default QaPresetQuestions;
