import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { Card } from '@/lib/types/Cards'
import { useCardsContext } from '@/cards/hooks/useCards'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
// import { Label } from '@/components/ui/label'
// import { Switch } from '@/components/ui/switch'
import { Textarea } from '@/components/ui/textarea'
import { EditCardFormData, editCardSchema } from '@/cards/schemas/card.schema'
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/form/form'
import { Text } from '@/components/ui/text'
import { DialogClose } from '@/components/ui/dialog'

interface EditCardInfoFormProps {
  card: Card
  onClose: (open: boolean) => void
}

export const EditCardInfoForm = ({ card, onClose }: EditCardInfoFormProps) => {
  const { editCard } = useCardsContext()

  const form = useForm<EditCardFormData>({
    resolver: zodResolver(editCardSchema),
    defaultValues: {
      title: card?.title || '',
      description: card?.description || '',
      isPublic: card?.isPublic ?? true,
      items: card?.items || [],
    },
  })

  const {
    handleSubmit,
    // watch,
    // setValue,
    formState: { errors },
  } = form

  // const isPublic = watch('isPublic')

  const onSubmit = async (data: EditCardFormData) => {
    editCard(card.id, data)
    onClose(false)
  }

  return (
    <Form {...form}>
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="max-h-[80dvh] overflow-y-auto"
      >
        <div className="grid grid-cols-[1fr] gap-y-2">
          <FormField
            control={form.control}
            name="title"
            render={({ field }) => (
              <FormItem>
                <FormLabel>
                  <div className="mb-1 flex items-center gap-x-2">
                    <Text
                      as="p"
                      variant="body"
                      className="font-semibold text-purple-900"
                    >
                      Wishlist Title
                    </Text>
                  </div>
                </FormLabel>
                <FormControl>
                  <Input
                    placeholder="Enter Wishlist Title"
                    error={!!errors.title}
                    {...field}
                  />
                </FormControl>
                <FormMessage className="text-red-600 text-sm font-normal" />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="description"
            render={({ field }) => (
              <FormItem>
                <FormLabel>
                  <div className="mb-1 flex items-center gap-x-2">
                    <Text
                      as="p"
                      variant="body"
                      className="font-semibold text-purple-900"
                    >
                      Wishlist Description
                    </Text>
                  </div>
                </FormLabel>
                <FormControl>
                  <Textarea
                    placeholder="Enter Wishlist Description"
                    error={!!errors.description}
                    {...field}
                  />
                </FormControl>
                <FormMessage className="text-red-600 text-sm font-normal" />
              </FormItem>
            )}
          />

          {/* <FormItem className="flex items-center gap-4">
            <FormLabel>
              <div className="flex items-center gap-1">
                <Text
                  as="p"
                  variant="body"
                  className="font-semibold text-purple-900"
                >
                  Make Wishlist Public
                </Text>
              </div>
            </FormLabel>
            <FormControl>
              <div className="flex items-center gap-2">
                <Switch
                  id="switch-isPublic"
                  checked={isPublic}
                  onCheckedChange={(val) => {
                    setValue('isPublic', val, { shouldValidate: true })
                  }}
                />
                <Label htmlFor="switch-isPublic">
                  {isPublic ? 'Public' : 'Private'}
                </Label>
              </div>
            </FormControl>
            <FormMessage className="text-red-600 text-sm font-normal" />
          </FormItem> */}

          {/* Action buttons */}
          <div className="flex gap-2 mt-4 justify-between sm:justify-end">
            <DialogClose asChild>
              <Button
                type="button"
                variant="outline"
                size="sm"
              >
                Close
              </Button>
            </DialogClose>
            <Button
              type="submit"
              size="sm"
            >
              Save Changes
            </Button>
          </div>
        </div>
      </form>
    </Form>
  )
}
