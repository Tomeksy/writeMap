import React, { useState, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { Loader2, Info } from 'lucide-react';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import axios from 'axios';
import { cn, incrementSubmissionCount } from '../lib/utils';

const LOADING_MESSAGES = [
  'Die KI Agents analysieren deinen Schreibstil... (Dies kann bis zu 30 Minuten dauern)',
  'Die Agents analysieren deine Grammatik',
  'Metaphorische Mittel werden geprüft',
  'Gesamtkohärenz und Kohäsion',
  'Satzstruktur und Muster',
  'Bald fertig',
  'Ein Report wird generiert',
  'Die KI Agents entwerfen ein Dokument',
  'Überprüfe dein Postfach in 7 Minuten & 13 Sekunden'
];

const formSchema = z.object({
  name: z.string()
    .min(1, 'Name ist erforderlich')
    .refine(value => value.trim().split(/\s+/).length >= 2, {
      message: 'Bitte geben Sie mindestens zwei Worte ein'
    }),
  email: z.string().email('Bitte geben Sie eine gültige E-Mail-Adresse ein'),
  firma: z.string().optional(),
  content: z.string()
    .min(1, 'Text ist erforderlich')
    .refine(
      (val) => {
        const wordCount = val.trim().split(/\s+/).filter(Boolean).length;
        return wordCount >= 150;
      },
      {
        message: 'Bitte gebe mindestens 150 Worte ein, um eine Schreibstil Analyse zu erstellen.'
      }
    ),
  consent: z.literal(true, {
    errorMap: () => ({ message: 'Aus Datenschutz Gründen muss uns genehmigt werden dir die WriteMap auf dein E-Mail Postfach zu senden, danke für dein Verständnis.' })
  })
});

type FormData = z.infer<typeof formSchema>;

export function UploadForm() {
  const queryClient = useQueryClient();
  const [loadingMessageIndex, setLoadingMessageIndex] = useState(0);
  const [wordCount, setWordCount] = useState(0);
  
  const { register, handleSubmit, watch, formState: { errors }, reset } = useForm<FormData>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      consent: true // Set consent to true by default
    }
  });

  const content = watch('content');

  useEffect(() => {
    if (content) {
      const words = content.trim().split(/\s+/).filter(Boolean).length;
      setWordCount(words);
    } else {
      setWordCount(0);
    }
  }, [content]);

  const mutation = useMutation({
    mutationFn: async (data: FormData) => {
      const formData = new FormData();
      formData.append('name', data.name);
      formData.append('email', data.email);
      if (data.firma) formData.append('firma', data.firma);
      formData.append('content', data.content);

      let currentIndex = 0;
      const messageInterval = setInterval(() => {
        setLoadingMessageIndex(prev => {
          if (prev < LOADING_MESSAGES.length - 1) {
            return prev + 1;
          }
          return prev;
        });
        currentIndex++;
      }, 15000);

      try {
        const response = await axios.post('https://hook.eu2.make.com/gx8h9xdoqkn34rnpq2g9gkf8f8vehg3x', formData, {
          headers: {
            'Content-Type': 'multipart/form-data',
          },
        });
        
        const newCount = incrementSubmissionCount();
        queryClient.setQueryData(['submissionCount'], newCount);
        
        return response.data;
      } finally {
        clearInterval(messageInterval);
      }
    },
    onSuccess: () => {
      reset();
      setLoadingMessageIndex(0);
      setWordCount(0);
    },
    onError: () => {
      setLoadingMessageIndex(0);
    }
  });

  const onSubmit = (data: FormData) => {
    mutation.mutate(data);
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="max-w-xl mx-auto p-6 bg-white/80 backdrop-blur-sm rounded-xl shadow-md">
      <div className="space-y-4">
        <div>
          <label htmlFor="name" className="block text-sm font-medium text-slate-900">Vollständiger Name</label>
          <input
            {...register('name')}
            type="text"
            id="name"
            className={cn(
              "mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500",
              errors.name && "border-red-500"
            )}
          />
          {errors.name && (
            <p className="mt-1 text-sm text-red-600">{errors.name.message}</p>
          )}
        </div>

        <div>
          <label htmlFor="email" className="block text-sm font-medium text-slate-900">E-Mail Adresse</label>
          <input
            {...register('email')}
            type="email"
            id="email"
            className={cn(
              "mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500",
              errors.email && "border-red-500"
            )}
          />
          {errors.email && (
            <p className="mt-1 text-sm text-red-600">{errors.email.message}</p>
          )}
        </div>

        <div>
          <label htmlFor="firma" className="block text-sm font-medium text-slate-900">Firma (optional)</label>
          <input
            {...register('firma')}
            type="text"
            id="firma"
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
          />
        </div>

        <div>
          <label htmlFor="content" className="block text-sm font-medium text-slate-900">Text eingeben</label>
          <div className="flex items-center gap-2 mt-1 mb-2 text-sm text-slate-600">
            <Info className="w-4 h-4" />
            <p>Deine Eingabe sollte ein minimum von 150 Wörtern haben, um eine Analyse erstellen zu können</p>
          </div>
          <div className="relative">
            <textarea
              {...register('content')}
              id="content"
              rows={6}
              className={cn(
                "mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500",
                errors.content && "border-red-500"
              )}
            />
            <div className="absolute bottom-2 right-2 text-sm text-slate-500">
              {wordCount}/150 Worte
            </div>
          </div>
          {errors.content && (
            <p className="mt-1 text-sm text-red-600">{errors.content.message}</p>
          )}
        </div>

        {mutation.isError && (
          <div className="p-3 bg-red-50 text-red-700 rounded-md">
            Es ist ein Fehler aufgetreten. Bitte versuche es erneut
          </div>
        )}

        {mutation.isSuccess && (
          <div className="p-3 bg-green-50 text-green-700 rounded-md">
            Deine WriteMap ist fast fertig! Wir schicken dir in wenigen Minuten eine E-Mail 🎊 - Bitte schau in deine Spam, solltest du sie nicht im Postfach haben.
          </div>
        )}

        <button
          type="submit"
          disabled={mutation.isPending}
          className="w-full flex items-center justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:opacity-50"
        >
          {mutation.isPending ? (
            <>
              <Loader2 className="animate-spin -ml-1 mr-2 h-4 w-4" />
              {LOADING_MESSAGES[loadingMessageIndex]}
            </>
          ) : (
            'Hochladen'
          )}
        </button>

        <div className="flex items-start gap-2">
          <input
            type="checkbox"
            {...register('consent')}
            id="consent"
            className="mt-1"
            defaultChecked={true}
          />
          <label htmlFor="consent" className="text-sm text-slate-700">
            Mit dem Hochladen bestätige ich, dass Harvest Flow mir E-Mails bezüglich WriteMap und anderen Produkten senden darf
          </label>
        </div>
        {errors.consent && (
          <p className="text-sm text-red-600">{errors.consent.message}</p>
        )}
      </div>
    </form>
  );
}
